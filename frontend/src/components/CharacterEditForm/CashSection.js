import React from "react";

function CashSection({ payload, handleChangeSectionInfo }) {
  const handleUpdateSectionInfo = (e) => {
    if (!payload) return;

    handleChangeSectionInfo({
      target: {
        name: "cash",
        value: {
          ...payload,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="spendinglevel">Livello di spesa:</label>
        <input
          type="text"
          id="spendinglevel"
          name="spendinglevel"
          value={payload.spendinglevel}
          placeholder="Livello di spesa"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div>
        <label htmlFor="cash">Contante:</label>
        <input
          type="text"
          id="cash"
          name="cash"
          value={payload.cash}
          placeholder="Contante"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div>
        <label htmlFor="properties">Proprietà:</label>
        {Array.from({
          length: Math.max(payload.properties?.length || 0, 10),
        }).map((_, i) => (
          <div key={i}>
            <input
              type="text"
              id={`properties_${i}`}
              name={`properties[${i}]`}
              value={payload.properties ? payload.properties[i] : ""}
              placeholder="Proprietà"
              onChange={handleUpdateSectionInfo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashSection;

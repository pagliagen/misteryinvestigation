import React from "react";

function EquipmentSection({ payload, handleChangeSectionInfo }) {
  if (!payload) return;

  const handleAddEquipment = (e) => {
    e.preventDefault();
    const newPayload = payload;
    newPayload.push("");
    handleChangeSectionInfo({
      target: { name: "equipments", value: newPayload },
    });
  };

  const handleRemoveEquipment = (e, index) => {
    e.preventDefault();
    if (payload.length > 5) {
      const updatedPayload = payload;
      updatedPayload.splice(index, 1);
      handleChangeSectionInfo({
        target: { name: "equipments", value: updatedPayload },
      });
    }
  };

  const handleUpdateSectionInfo = (index, value) => {
    const updatedPayload = payload;
    updatedPayload[index] = value;
    handleChangeSectionInfo({
      target: { name: "equipments", value: updatedPayload },
    });
  };

  return (
    <div>
      {payload.map((equipment, index) => (
        <div key={index}>
          <input
            type="text"
            id={`equipments-${index}-name`}
            value={equipment || ""}
            placeholder="Attrezzatura o Equipaggiamento"
            onChange={(e) => handleUpdateSectionInfo(index, e.target.value)}
          />
          {payload.length > 5 && (
            <button onClick={(e) => handleRemoveEquipment(e, index)}>
              Rimuovi
            </button>
          )}
        </div>
      ))}
      <button onClick={handleAddEquipment}>Aggiungi Equipaggiamento</button>
    </div>
  );
}

export default EquipmentSection;

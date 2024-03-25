import React from "react";

function CharacteristicsSection({ payload, handleChangeSectionInfo,listCharacteristics }) {

  const handleUpdateSectionInfo = (e) => {
    if (!payload) return;
    
    handleChangeSectionInfo({
      target: {
        name: "characteristics",
        value: {
          ...payload,
          [e.target.name]: parseInt(e.target.value) || 0,
        },
      },
    });
  };

  return (
    <div className="character-create-form__sections_characteristics">
      {listCharacteristics && listCharacteristics.map((characteristic, index) => (
        <div key={index} className="character-create-form__sections_field">
          <label htmlFor={`characteristic-${index}-name`}>
            {characteristic.name}:
          </label>
          <input
            type="number"
            id={`characteristic-${index}-name`}
            name={characteristic.name}
            value={payload[characteristic.name] || 0}
            placeholder={characteristic.name}
            min={0}
            max={100}
            onChange={handleUpdateSectionInfo}
          />
        </div>
      ))}
    </div>
  );
}

export default CharacteristicsSection;

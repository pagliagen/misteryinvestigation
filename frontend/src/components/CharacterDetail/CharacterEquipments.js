import React from "react";

function CharacterEquipments({ equipments }) {
  return (
    <div className="character-sheetpage_equipments">
        {equipments.map((item, index) => (
          <div key={`equipments_${index}`}>{item}</div>
        ))}
      </div>
  );
}

export default CharacterEquipments;

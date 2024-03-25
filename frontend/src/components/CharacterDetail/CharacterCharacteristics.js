import React from "react";

function CharacterCharacteristics({ characteristics, handleDiceRoll }) {
  return (
    <div className="character-sheetpage_characteristics">
      {characteristics.map((c) => (
        <div
            key={`characteristics_${c.name}`}
            className="character-sheetpage_characteristics_stat character-hover"
            onClick={() => handleDiceRoll(c.name, c.value)}
          >
            <div className="character-sheetpage_characteristics_stat_name">
              {c.name}
            </div>
            <div className="character-sheetpage_characteristics_stat_value">
              {c.value}
            </div>
          </div>
        ))}      
      </div>
  );
}

export default CharacterCharacteristics;

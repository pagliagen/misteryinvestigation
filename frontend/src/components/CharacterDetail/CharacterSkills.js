import React from "react";

function CharacterSkills({ skills,handleDiceRoll }) {
  return (
    <div className="character-sheetpage_skills">
    {skills.map((s) => (
      <div
        key={`skills_${s.name}`}
        className="character-sheetpage_skills_stat character-hover"
        onClick={() => handleDiceRoll(s.name, s.value)}
      >
        <div className="sheetpage_skills_stat_name">{s.name}</div>
        <div className="sheetpage_skills_stat_value">{s.value}</div>
      </div>
    ))}
  </div>
  );
}

export default CharacterSkills;

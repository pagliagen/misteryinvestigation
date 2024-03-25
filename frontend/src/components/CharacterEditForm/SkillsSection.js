import React, { useEffect, useState } from "react";

function SkillsSection({ payload, listSkills, handleChangeSectionInfo }) {
  const [listCharacterSkills, setListCharacterSkills] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);
  const [usedPointSkills, setUsedPointsSkills] = useState([]);
  const [needSave, setNeedSave] = useState([]);

  useEffect(() => {
    console.log("SkillsSection payload", payload);

    const combinedSkills = [...listSkills, ...payload];
    combinedSkills.sort((a, b) => a.name.localeCompare(b.name));
    setListCharacterSkills(combinedSkills);
    setTempSkills(combinedSkills);
  }, [payload, listSkills]);

  const handleUpdateSectionInfo = (index, key, value) => {
    const updatedSkills = [...tempSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [key]: value,
    };
    setTempSkills(updatedSkills);

    needSave[index] = true;
    setNeedSave(needSave);
  };

  const handleSaveSkill = (e, index) => {
    e.preventDefault();

    if (listCharacterSkills[index].name !== tempSkills[index].name) {
      console.log(listCharacterSkills[index], tempSkills[index]);
      const oldRow = tempSkills[index];
      oldRow.value = listCharacterSkills[index].value;
      listCharacterSkills[index].value = listCharacterSkills[index].minValue;
      listCharacterSkills.push(oldRow);
    }

    const updatedSkills = [...listCharacterSkills];
    updatedSkills[index] = tempSkills[index];
    setListCharacterSkills(updatedSkills);

    needSave[index] = false;
    setNeedSave(needSave);
 
    handleChangeSectionInfo({
      target: { name: "skills", value: updatedSkills },
    });
  };

  const handleRemoveSkill = (e, index) => {
    e.preventDefault();
    const updatedSkills = [...tempSkills];
    updatedSkills.splice(index, 1);
    setTempSkills(updatedSkills);
  };

  useEffect(() => {
    const usedPoints = tempSkills.map((obj, index) => ({
      [index]: obj.value - obj.minValue,
    }));
    setUsedPointsSkills(usedPoints);
  }, [tempSkills]);

  return (
    <div className="character-skillsection">
      {usedPointSkills.length > 0 && (
        <div className="character-skillsection_totalpoint">
          Punti totali spesi:
          <span className="character-skillsection_points">
            {usedPointSkills.reduce(
              (acc, obj) => acc + obj[Object.keys(obj)[0]],
              0
            )}
          </span>
        </div>
      )}
      {tempSkills.map((skill, index) => (
        <div key={index} className="character-skillsection_list">
          <input
            type="text"
            id={`skill-${index}-name`}
            value={skill.name}
            className="character-skillsection_name"
            placeholder="Nome Abilità"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "name", e.target.value)
            }
          />
          <input
            type="number"
            id={`skill-${index}-value`}
            value={skill.value}
            className="character-skillsection_value"
            placeholder="Valore"
            min={skill.minValue || 0}
            max={skill.maxValue || 100}
            onChange={(e) =>
              handleUpdateSectionInfo(index, "value", parseInt(e.target.value))
            }
          />
          <span className="character-skillsection_labelpoints">
            (Base: {skill.minValue}% - Speso:{" "}
            <span className="character-skillsection_points">
              {skill.value - skill.minValue}
            </span>{" "}
            punti)
          </span>
          {needSave[index] && (
            <button onClick={(e) => handleSaveSkill(e, index)}>Salva</button>
          )}
          {listSkills.findIndex((s) => s.name === skill.name) === -1 && (
            <button onClick={(e) => handleRemoveSkill(e, index)}>
              Rimuovi
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;

import React, { useEffect, useState } from "react";

function WorkAndSkills({ character, setCharacter }) {
  const [work, setWork] = useState("");
  const [skills, setSkills] = useState([]);
  const [formulaWork, setFormulaWork] = useState("");
  const [pointWork, setPointWork] = useState(0);
  const [pointInterest, setPointInterest] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);

  useEffect(() => {
    const updateSkillValue = (arraySkills, name, minValue) => {
      const skill = arraySkills.find((skill) => skill.name === name);
      if (skill) {
        skill.minValue = minValue;
      }
    };

    const characteristicsGetValue = (key) => {
      const row = character.characteristics.find(
        (characteristic) => characteristic.name === key
      );
      return parseInt(row?.value || 0);
    };

    if (character.characterInfo) {
      setWork(character.characterInfo.work);
    }
    if (character.characteristics) {
      const puntiIntelligenza = characteristicsGetValue("Intelligenza");
      const puntiIstruzione = characteristicsGetValue("Istruzione");
      const puntiDestrezza = characteristicsGetValue("Destrezza");
      setPointInterest(puntiIntelligenza * 2);

      let actSkills = character.skills || [];
      if (actSkills) {
        updateSkillValue(actSkills, "Lingua (Madre)", puntiIstruzione);
        updateSkillValue(actSkills, "Schivare", parseInt(puntiDestrezza / 2));
        setSkills(actSkills);
      }
    }
  }, [character]);

  useEffect(() => {
    const evaluateUsedPoints = (actSkills) => {
      let used = 0;
      actSkills.forEach((skill) => {
        skill.value = parseInt(skill.value);
        skill.minValue = parseInt(skill.minValue);
        if (skill.value < skill.minValue) {
          skill.value = skill.minValue;
        }
        if (skill.value > skill.maxValue) {
          skill.value = skill.maxValue;
        }
        used += skill.value - skill.minValue;
      });
      setPointUsed(used);
    };

    evaluateUsedPoints(skills);
  }, [skills]);

  const calculateFormula = (formula) => {
    let total = 0;

    const attributes = character.characteristics || [];
    const termini = formula.split("+");
    for (let i = 0; i < termini.length; i++) {
      const terms = termini[i].trim().split(" ");

      const attribute = terms[0];
      const findChar = attributes.find((char) => char.name === attribute);
      if (!findChar) {
        return;
      }

      const operator = terms[1];
      const value = parseInt(terms[2]);
      if (isNaN(value)) {
        return;
      }

      if (operator === "x") {
        total += findChar.value * value;
      }
    }

    return total;
  };

  const handleChangeFormulaWork = (e) => {
    e.preventDefault();
    const point = calculateFormula(e.target.value);
    setPointWork(point || "Formula non valida");
    setFormulaWork(e.target.value);
  };

  const handleChangeSkillValue = (name, value) => {
    const findSkill = skills.find((skill) => skill.name === name);
    if (findSkill) {
      findSkill.value = isNaN(parseInt(value)) ? 0 : parseInt(value); 
      if (findSkill.value > findSkill.maxValue) {
        findSkill.value = findSkill.maxValue;
      }
    }
    setSkills([...skills]);
  };

  const handleSaveStep = () => {
    const actCharacter = character;
    actCharacter.characterInfo.work = work;
    actCharacter.skills = skills;
    setCharacter({ ...actCharacter });
  };

  const saveButton = () => {
    let enableButton = pointInterest + pointWork - pointUsed === 0;
    if (enableButton) {
      return <button onClick={() => handleSaveStep()}>Salva e continua</button>;
    } else {
      return <button disabled>Salva e continua</button>;
    }
  };

  return (
    <div className="character-step-workandskills">
      <div className="character-step-work">
        <h2>Occupazione</h2>
        <div className="character-step-work-content">
          <div>
            <label>Lavoro</label>
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          </div>
          <div>
            <label>Formula</label>
            <input
              type="text"
              value={formulaWork}
              placeholder="Esempio: Intelligenza x 2 + Istruzione x 2"
              onChange={(e) => handleChangeFormulaWork(e)}
            />
          </div>
          <div>
            <label>Punti Lavoro</label>
            <input type="text" readOnly value={pointWork} />
          </div>
          <div>
            <label>Punti Interessi personali</label>
            <input type="text" readOnly value={pointInterest} />
          </div>
          <div>
            <label>Punti Spesi</label>
            <input type="text" readOnly value={pointUsed} />
          </div>
        </div>
      </div>
      <div className="character-step-skills">
        <h2>Abilità</h2>
        <div className="character-step-skills-content">
          {skills?.map((skill, index) => (
            <div key={index}>
              <label>{skill.name}</label>
              <input
              className={skill.value < skill.minValue ? "invalid" : ""}
                type="text"
                value={skill.value}
                onChange={(e) =>
                  handleChangeSkillValue(skill.name, e.target.value)
                }
              />
              <div className="skill_notice">Valore minimo {skill.minValue}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="workandskills-submit">{saveButton()}</div>
    </div>
  );
}

export default WorkAndSkills;

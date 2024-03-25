import React from "react";
import slugify from "slugify";
import IconUndo from "./IconUndo";
import IconSave from "./IconSave";

function CharacterEditTemplate_Desktop({
  character,
  setUpdateCharacter,
  saveCharacter,
  undoCharacter,
}) {
  const handleChangeCharacteristics = (name, newValue) => {
    if (parseInt(newValue) > 0 && parseInt(newValue) <= 100) {
      const oldCharacteristics = character.characteristics;
      oldCharacteristics.find((c) => c.name === name).value =
        parseInt(newValue);
      setUpdateCharacter({
        ...character,
        characteristics: oldCharacteristics,
      });
    }
  };

  const handleChangeSkills = (name, newValue) => {
    if (parseInt(newValue) >= 0 && parseInt(newValue) <= 100) {
      const updateSkill = character.skills;
      updateSkill.find((s) => s.name === name).value = parseInt(newValue);
      setUpdateCharacter({
        ...character,
        skills: updateSkill,
      });
    }
  };

  return (
    <div className="character-sheetpage edit-template">
      <h2>
        <input
          type="text"
          name="name"
          value={character.characterInfo.name}
          onChange={(e) =>
            setUpdateCharacter({
              ...character,
              characterInfo: {
                ...character.characterInfo,
                name: e.target.value,
              },
            })
          }
        />
        <IconUndo onClick={() => undoCharacter()} />
        <IconSave onClick={() => saveCharacter(character)} />
      </h2>
      <div className="character-sheetpage_header">
        <div>
          Educazione:
          <input
            type="text"
            name="name"
            value={character.characterInfo.education}
            onChange={(e) =>
              setUpdateCharacter({
                ...character,
                characterInfo: {
                  ...character.characterInfo,
                  education: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          Lavoro:{" "}
          <input
            type="text"
            name="name"
            value={character.characterInfo.work}
            onChange={(e) =>
              setUpdateCharacter({
                ...character,
                characterInfo: {
                  ...character.characterInfo,
                  work: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          Nato a:{" "}
          <input
            type="text"
            name="name"
            value={character.characterInfo.birthplace}
            onChange={(e) =>
              setUpdateCharacter({
                ...character,
                characterInfo: {
                  ...character.characterInfo,
                  birthplace: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          Anno di nascita:{" "}
          <input
            type="text"
            name="name"
            value={character.characterInfo.bornage}
            onChange={(e) =>
              setUpdateCharacter({
                ...character,
                characterInfo: {
                  ...character.characterInfo,
                  bornage: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <img src={`${character.images.avatar}`} alt="Avatar" />
        </div>
      </div>
      <div className="character-sheetpage_characteristics">
        {character.characteristics.map((c) => (
          <div
            key={`characteristics_${c.name}`}
            className="character-sheetpage_characteristics_stat character-hover"
          >
            <div className="character-sheetpage_characteristics_stat_name">
              {c.name}
            </div>
            <div className="character-sheetpage_characteristics_stat_value">
              <input
                type="text"
                value={c.value}
                onChange={(e) =>
                  handleChangeCharacteristics(c.name, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="character-sheetpage_points">
        {character.points.map((point) => (
          <div
            key={`points_${slugify(point.name.toLocaleLowerCase())}`}
            className="character-sheetpage_points_stat character-hover"
          >
            <div className="character-sheetpage_points_stat_name">
              {point.name}
            </div>
            <div className="character-sheetpage_points_stat_value">
              {point.value} / {point.maxValue}
            </div>
          </div>
        ))}
      </div>
      <div className="character-sheetpage_skills">
        {character.skills.map((s) => (
          <div
            key={`skills_${s.name}`}
            className="character-sheetpage_skills_stat character-hover"
          >
            <div className="sheetpage_skills_stat_name">{s.name}</div>
            <div className="sheetpage_skills_stat_value">
              <input
                type="text"
                value={s.value}
                onChange={(e) => handleChangeSkills(s.name, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="character-sheetpage_weapons">
        {character.weapons.map((weapon) => (
          <div key={`weapons_${weapon._id}`}>
            <p>Nome: {weapon.name}</p>
            <p>Valore: {weapon.value}</p>
            <p>Danno: {weapon.damage}</p>
            <p>Gittata: {weapon.range}</p>
            <p>Attacchi: {weapon.attacks}</p>
            <p>Munizioni: {weapon.ammo}</p>
            <p>Malfunzionamento: {weapon.malfunction}</p>
          </div>
        ))}
      </div>
      <div className="character-sheetpage_equipments">
        {character.equipments.map((item, index) => (
          <div key={`equipments_${index}`}>{item}</div>
        ))}
      </div>
      <div className="character-sheetpage_cash">
        <p>Livello di spesa: {character.cash.spendinglevel}</p>
        <p>Cash: {character.cash.cash}</p>
        <p>Proprietà: {character.cash.property}</p>
      </div>
    </div>
  );
}

export default CharacterEditTemplate_Desktop;

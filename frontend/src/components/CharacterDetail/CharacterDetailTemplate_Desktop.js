import React, { useState } from "react";
import IconPencil from "./IconPencil";
import CharacterInfoSection from "./CharacterInfoSection";
import CharacterCharacteristics from "./CharacterCharacteristics";
import CharacterPoints from "./CharacterPoints";
import CharacterSkills from "./CharacterSkills";
import CharacterWeapons from "./CharacterWeapons";
import CharacterEquipments from "./CharacterEquipments";
import CharacterCash from "./CharacterCash";

function CharacterDetailTemplate_Desktop({
  character,
  switchToUpdateCharacter,
  handleDiceRoll,
}) {
  const [section, setSection] = useState("info");

  const handleChangeSection = (section) => {
    setSection(section);
  };

  return (
    <div className="character-sheetpage desktop">
      <div className="character-sheetpage-debuginfo">
          <pre>
            {JSON.stringify(
              character,
              (key, value) => {
                if (key === 'images') {
                  return undefined;
                }
                return value;
              },
              4
            )}
          </pre>
      </div>
      <h2>
        {character.characterInfo.name}{" "}
        <IconPencil onClick={() => switchToUpdateCharacter()} />
      </h2>
      <div className="character-sheetpage_wrapper">
        <div className="character-sheetpage_sections">
          <ul>
            <li
              className={section === "info" ? "active" : "inactive"}
              onClick={() => handleChangeSection("info")}
            >
              Informazioni
            </li>
            <li
              className={section === "characteristics" ? "active" : "inactive"}
              onClick={() => handleChangeSection("characteristics")}
            >
              Caratteristiche
            </li>
            <li
              className={section === "points" ? "active" : "inactive"}
              onClick={() => handleChangeSection("points")}
            >
              Punti
            </li>
            <li
              className={section === "skills" ? "active" : "inactive"}
              onClick={() => handleChangeSection("skills")}
            >
              Abilità
            </li>
            <li
              className={section === "weapons" ? "active" : "inactive"}
              onClick={() => handleChangeSection("weapons")}
            >
              Armi
            </li>
            <li
              className={section === "equipments" ? "active" : "inactive"}
              onClick={() => handleChangeSection("equipments")}
            >
              Equipaggiamento
            </li>
            <li
              className={section === "cash" ? "active" : "inactive"}
              onClick={() => handleChangeSection("cash")}
            >
              Soldi
            </li>
          </ul>
        </div>
        <div className="character-sheetpage_sectioncontent">
          {section === "info" && <CharacterInfoSection character={character} />}
          {section === "characteristics" && (
            <CharacterCharacteristics
              characteristics={character.characteristics}
              handleDiceRoll={handleDiceRoll}
            />
          )}
          {section === "points" && (
            <CharacterPoints points={character.points} />
          )}
          {section === "skills" && (
            <CharacterSkills
              skills={character.skills}
              handleDiceRoll={handleDiceRoll}
            />
          )}
          {section === "weapons" && (
            <CharacterWeapons weapons={character.weapons} />
          )}
          {section === "equipments" && (
            <CharacterEquipments equipments={character.equipments} />
          )}
          {section === "cash" && <CharacterCash cash={character.cash} />}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailTemplate_Desktop;

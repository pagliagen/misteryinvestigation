import React from "react";
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
  return (
    <div className="character-sheetpage mobile">
      <h2>
        {character.characterInfo.name}{" "}
        <IconPencil onClick={switchToUpdateCharacter} />
      </h2>
      <CharacterInfoSection character={character} />
      <CharacterCharacteristics
        characteristics={character.characteristics}
        handleDiceRoll={handleDiceRoll}
      />
      <CharacterPoints points={character.points} />
      <CharacterSkills
        skills={character.skills}
        handleDiceRoll={handleDiceRoll}
      />
      <CharacterWeapons weapons={character.weapons} />
      <CharacterEquipments equipments={character.equipments} />
      <CharacterCash cash={character.cash} />
    </div>
  );
}

export default CharacterDetailTemplate_Desktop;

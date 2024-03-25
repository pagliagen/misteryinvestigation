import React from "react";

function CharacterInfoSection({ character }) {
  return (
    <div className="character-sheetpage_header">
      <div>Educazione: {character.characterInfo.education}</div>
      <div>Lavoro: {character.characterInfo.work}</div>
      <div>Nato a: {character.characterInfo.birthplace}</div>
      <div>Anno di nascita: {character.characterInfo.bornage}</div>
      <div hidden>
        <img
          src={`${character.images.avatar}`}
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default CharacterInfoSection;

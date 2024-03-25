import React, { useState } from "react";
import CharacterDetailTemplate from "./CharacterDetail/CharacterDetailTemplate";
import CharacterEditTemplate from "./CharacterDetail/CharacterEditTemplate";
import { updateCharacter } from "../services/characters";

function CharacterDetail({ character, handleUpdateCharacter }) {
  const [editMode, setEditMode] = useState(false);

  const switchToUpdateCharacter = () => {
    setEditMode(!editMode);
  };

  const handleSaveCharacter = (newCharacter) => {
    updateCharacter(newCharacter).then((response) => {
      console.log("Character updated", response);
      handleUpdateCharacter(response.character);
      setEditMode(false);
    });
  };

  if (editMode) {
    return (
      <div className="character-detail">
        <CharacterEditTemplate
          character={character}
          saveCharacter={handleSaveCharacter}
          undoCharacter={switchToUpdateCharacter}
        />
      </div>
    );
  } else {
    return (
      <div className="character-detail">
        <CharacterDetailTemplate
          character={character}
          switchToUpdateCharacter={switchToUpdateCharacter}
        />
      </div>
    );
  }
}

export default CharacterDetail;

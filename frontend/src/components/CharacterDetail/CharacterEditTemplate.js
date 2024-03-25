import React, { useState } from "react";
import "./CharacterDetailTemplate.css";
import { useGlobalState } from "../../context/GlobalStateContext";
import CharacterEditTemplateDesktop from "./CharacterEditTemplate_Desktop";
import CharacterEditTemplateMobile from "./CharacterEditTemplate_Mobile";

function CharacterEditTemplate({ character, saveCharacter, undoCharacter }) {
  const { isMobile } = useGlobalState();
  const [updateCharacter, setUpdateCharacter] = useState(character);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isMobile && (
        <CharacterEditTemplateMobile
          character={updateCharacter}
          setUpdateCharacter={setUpdateCharacter}
          saveCharacter={saveCharacter}
          undoCharacter={undoCharacter}
        />
      )}
      {!isMobile && (
        <CharacterEditTemplateDesktop
          character={updateCharacter}
          setUpdateCharacter={setUpdateCharacter}
          saveCharacter={saveCharacter}
          undoCharacter={undoCharacter}
        />
      )}
    </>
  );
}

export default CharacterEditTemplate;

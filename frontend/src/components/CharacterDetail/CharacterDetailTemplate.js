import React from "react";
import "./CharacterDetailTemplate.css";
import { useGlobalState } from "../../context/GlobalStateContext";
import CharacterDetailTemplateDesktop from "./CharacterDetailTemplate_Desktop";
import CharacterDetailTemplateMobile from "./CharacterDetailTemplate_Mobile";

function CharacterDetailTemplate({ character, switchToUpdateCharacter }) {
  const { socket, sendSocketMessage, isMobile } = useGlobalState();

  if (!character) {
    return (
      <div>Loading...</div>
    );
  }

  const handleDiceRoll = (name, value) => {
    const dice = Math.floor(Math.random() * 100) + 1;
    const message = `<b>${character.characterInfo.name}</b> ha tirato su <b>${name}</b> ottenendo <b>${dice}/${value}</b>`;

    if (socket) {
      let level = "failed";
      if (dice >= 99) level = "extrafailed";
      if (dice <= value) level = "normal";
      if (dice <= 0.5 * value) level = "arduous";
      if (dice <= 0.2 * value) level = "extreme";
      if (dice === 1) level = "critic";
      sendSocketMessage("DICE_ROLL", { message, level });
    }
  };

  return (
    <>
      {isMobile && (
        <CharacterDetailTemplateMobile
          character={character}
          handleDiceRoll={handleDiceRoll}
          switchToUpdateCharacter={switchToUpdateCharacter}
        />
      )}
      {!isMobile && (
        <CharacterDetailTemplateDesktop
          character={character}
          handleDiceRoll={handleDiceRoll}
          switchToUpdateCharacter={switchToUpdateCharacter}
        />
      )}
    </>
  );
}

export default CharacterDetailTemplate;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";
import { useGlobalState } from "../context/GlobalStateContext";
import DiceRollerMessages from "../components/DiceRollerMessages";
import "./CharacterDetailPage.css";

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const { sessionInfo ,updateCharacter} = useGlobalState();

  const navigate = useNavigate();

  const handleUpdateCharacter = (updatedCharacter) => {
    updateCharacter(updatedCharacter);
  }

  useEffect(() => {
    if (sessionInfo.characters === null) {
      sessionInfo.fetchUser();
    } else {
      const activeCharacter = sessionInfo.characters.find(
        (character) => character._id === id
      );
      if (activeCharacter) {
        setCharacter(activeCharacter);
      } else {
        navigate("/characters/list");
      }
    }
  }, [id, sessionInfo, navigate]);

  return (
    <div className="character-detail-content">
      <CharacterDetail character={character} handleUpdateCharacter={handleUpdateCharacter} />
      <DiceRollerMessages />
    </div>
  );
}

export default CharacterDetailPage;

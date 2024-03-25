import React, { useEffect } from "react";
import CharacterList from "../components/CharacterList";
import { useGlobalState } from "../context/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import "./CharacterListPage.css";

function CharacterListPage() {
  const { sessionInfo } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/");
    } else {
      if (sessionInfo.characters === null) {
        sessionInfo.fetchUser();
      }
    }
  }, [sessionInfo, navigate]);

  return (
      <div className="character-list-content">
        {sessionInfo.characters ? (
          <CharacterList characters={sessionInfo.characters} />
        ) : (
          "Loading..."
        )}
    </div>
  );
}

export default CharacterListPage;

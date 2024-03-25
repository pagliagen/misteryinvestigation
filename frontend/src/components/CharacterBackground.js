import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";
import "./CharacterBackground.css";

function CharacterBackground({
  backToList,
  createNewCharacter,
  editCharacter,
}) {
  const { sessionInfo, setSessionInfo } = useGlobalState();
  const [isMaster, setIsMaster] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMaster(sessionInfo.user?.isMaster || false);
  }, [sessionInfo]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSessionInfo({
      ...sessionInfo,
      user: null,
      characters: null,
      activeCharacter: null,
    });
    navigate("/login");
  };

  const handleGotoList = () => {
    setSessionInfo({ ...sessionInfo, activeCharacter: null });
    navigate("/characters/list");
  };

  const handleGotoCreateNewCharacter = () => {
    setSessionInfo({ ...sessionInfo, activeCharacter: null });
    navigate("/characters/new");
  };

  const handleGotoEditCharacter = (id) => {
    navigate(`/characters/edit/${id}`);
  };

  const handleGotoAudio = (id) => {
    navigate(`/audio`);
  };

  return (
    <div className="character-background">
      <div className="character-background_header"></div>
      <div className="character-background_buttons ">
        <div className="page-content">
          <div>
            <button onClick={() => handleLogout()}>Torna al Login</button>
          </div>
          {isMaster && (
            <div>
              <button onClick={() => handleGotoAudio()}>Vai a Audio</button>
            </div>
          )}
          {backToList && (
            <div>
              <button onClick={() => handleGotoList()}>Vai a Lista</button>
            </div>
          )}
          {createNewCharacter && (
            <div>
              <button onClick={() => handleGotoCreateNewCharacter()}>
                Crea Nuovo
              </button>
            </div>
          )}
          {editCharacter && (
            <div>
              <button
                onClick={() => handleGotoEditCharacter(editCharacter._id)}
              >
                Modifica
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterBackground;

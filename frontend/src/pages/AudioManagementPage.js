import React, { useEffect } from "react";
import FileExplorer from "../components/FileExplorer";
import CharacterBackground from "../components/CharacterBackground";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";
import AudioPlayer from "../components/AudioPlayer";
import "./AudioManagementPage.css";

function AudioManagementPage() {
  const {  sessionInfo } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionInfo.user === null) {
      sessionInfo.fetchUser();
    } else {
      if (sessionInfo.user.isMaster === false) {
        navigate("/characters/list");
      }
    }
  }, [sessionInfo, navigate]);

  useEffect(() => {
    // Controlla se l'utente è loggato
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }
  }, [navigate]);

  return (
    <div className="audiomanagment-page page-wrapper">
      <CharacterBackground />
      <div className="audiomanagment-page_content page-content">
        <FileExplorer />
      </div>
      <AudioPlayer />
    </div>
  );
}

export default AudioManagementPage;

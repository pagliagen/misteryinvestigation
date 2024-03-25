import React from "react"; 
import { Route, Routes } from "react-router-dom";
import CharacterDetailPage from "./CharacterDetailPage";
import CharacterGenerator from "./CharacterGenerator";
import CharacterEditPage from "./CharacterEditPage";
import CharacterListPage from "./CharacterListPage";
import SheetPagePDF from "./SheetPagePDF";
import CharacterBackground from "../components/CharacterBackground";
import AudioPlayer from "../components/AudioPlayer";
import "./CharactersConteinerPage.css";

const CharactersConteinerPage = () => {
  return (
    <div className="characters-conteiner page-wrapper">
      <CharacterBackground createNewCharacter handleGotoList />
      <div className="characters-conteiner-content page-content">
      <Routes>
        <Route path="/list" element={<CharacterListPage />} />
        <Route path="/edit/:id" element={<CharacterEditPage />} />
        <Route path="/new" element={<CharacterGenerator />} />
        <Route path="/:id" element={<CharacterDetailPage />} />
        <Route path="/pdf/:id" element={<SheetPagePDF />} />
      </Routes>
      </div>
      <div className="characters-conteiner-audioplayer">
      <AudioPlayer />
      </div>
    </div>
  );
};

export default CharactersConteinerPage;

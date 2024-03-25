import React from "react";
import CharacterBackground from "../components/CharacterBackground";
import "./CharacterListPage.css";

function NotFoundPage() {
  return (
    <div className="characterlist-page page-wrapper">
      <CharacterBackground createNewCharacter />
      <div className="character-list-content page-content">Page not Found (404)</div>
    </div>
  );
}

export default NotFoundPage;

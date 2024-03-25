import React, { useEffect, useState } from "react";
import "./CharacterEditPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacterById } from "../services/characters";
import CharacterEditForm from "../components/CharacterEditForm";

function CharacterEditPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const navigate = useNavigate();
 
  useEffect(() => {
    // Ottieni i dettagli del personaggio dal backend al caricamento della pagina
    if (!id) {
      return
    }
    getCharacterById(id)
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => {
        navigate("/characters/list");
      });
  }, [id, navigate]);

  return (
    <div className="character-create-content">
        <CharacterEditForm character={character} />
    </div>
  );
}

export default CharacterEditPage;

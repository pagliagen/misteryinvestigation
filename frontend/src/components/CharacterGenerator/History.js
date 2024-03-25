import React, { useEffect, useState } from "react";
import AvatarUploader from "./AvatarUploader";

function History({ character, setCharacter }) {
        const [description, setDescription] = useState("");
        const [ideology, setIdeology] = useState("");
        const [importantPeople, setImportantPeople] = useState("");
        const [significantPlaces, setSignificantPlaces] = useState("");
        const [valuables, setValuables] = useState("");
        const [traits, setTraits] = useState("");
        const [wounds, setWounds] = useState("");
        const [phobias, setPhobias] = useState("");
        const [knowledge, setKnowledge] = useState("");
        const [meetings, setMeetings] = useState("");
  
  useEffect(() => {
    if (character.background) {
      setDescription(character.background.description);
      setIdeology(character.background.ideology);
      setImportantPeople(character.background.importantPeople);
      setSignificantPlaces(character.background.significantPlaces);
      setValuables(character.background.valuables);
      setTraits(character.background.traits);
      setWounds(character.background.wounds);
      setPhobias(character.background.phobias);
      setKnowledge(character.background.knowledge);
      setMeetings(character.background.meetings);
    }
  }, [character]);

  const handleSaveStep = () => {
    setCharacter({
      ...character,
      background: { ...character.background, description, ideology, importantPeople, significantPlaces, valuables, traits, wounds, phobias, knowledge, meetings },
    });
  };

  const saveButton = () => {
    return <button onClick={() => handleSaveStep()}>Salva e continua</button>;
  };

  return (
    <div className="character-step-history">
      <div className="character-step-history-content">
        <div className="history-textarea">
          <label>Descrizione Personale</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Ideologia/Credo</label>
          <textarea
            value={ideology}
            onChange={(e) => setIdeology(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Persone importanti</label>
          <textarea
            value={importantPeople}
            onChange={(e) => setImportantPeople(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Luoghi significativi</label>
          <textarea
            value={significantPlaces}
            onChange={(e) => setSignificantPlaces(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Oggetti di valore</label>
          <textarea
            value={valuables}
            onChange={(e) => setValuables(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Tratti</label>
          <textarea
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Ferite & Cicatrici</label>
          <textarea
            value={wounds}
            onChange={(e) => setWounds(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Fobie & Manie</label>
          <textarea
            value={phobias}
            onChange={(e) => setPhobias(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Tomi arcani, Incantesimi & Artefatti</label>
          <textarea
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
          />
        </div>
        <div className="history-textarea">
          <label>Incontri con Strane Entità</label>
          <textarea
            value={meetings}
            onChange={(e) => setMeetings(e.target.value)}
          />
        </div>
      </div>
      <div className="background-submit">{saveButton()}</div>
    </div>
  );
}

export default History;

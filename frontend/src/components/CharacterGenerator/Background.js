import React, { useEffect, useState } from "react";
import AvatarUploader from "./AvatarUploader";

function Background({ character, setCharacter }) {
  const [playerName, setPlayerName] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("Maschio");
  const [residence, setResidence] = useState("");
  const [bornage, setBornage] = useState(1900);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (character.characteristics) {
      setPlayerName(character.playerName);
      setName(character.characterInfo.name);
      setSex(character.characterInfo.sex);
      setResidence(character.characterInfo.residence);
      setBornage(character.characterInfo.bornage);
    }
    if (character.images) {
      setAvatar(character.images.avatar);
    }
  }, [character]);

  const handleSaveStep = () => {
    setCharacter({
      ...character,
      playerName,
      characterInfo: { ...character.characterInfo, name, sex, residence, bornage },
      images: { ...character.images, avatar },
    });
  };

  const saveButton = () => {
    return <button onClick={() => handleSaveStep()}>Salva e continua</button>;
  };

  return (
    <div className="character-step-background">
      <h2>Background</h2>
      <div className="character-step-background-content">
        <div>
          <label>Nome Giocatore</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <div>
          <label>Nome Personaggio</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Sesso</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="Maschio">Maschio</option>
            <option value="Femmina">Femmina</option>
          </select>
        </div>
        <div>
          <label>Residenza</label>
          <input
            type="text"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
          />
        </div>
        <div>
          <label>Anno di nascita</label>
          <input
            type="number"
            value={bornage}
            onChange={(e) => setBornage(e.target.value)}
          />
        </div>
      </div>
      <AvatarUploader avatar={avatar} setAvatar={setAvatar} />
      <div className="background-submit">{saveButton()}</div>
    </div>
  );
}

export default Background;

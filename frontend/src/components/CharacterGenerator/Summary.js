import React from "react";

function Summary({ character, saveCharacter }) {
  return (
    <div className="character-step-summary">
      <div className="character-step-summary-content">
        <pre>{JSON.stringify(character, null, 4)}</pre>
      </div>
      <div className="background-submit">
        <button onClick={() => saveCharacter()}>Crea Personaggio</button>
      </div>
    </div>
  );
}

export default Summary;

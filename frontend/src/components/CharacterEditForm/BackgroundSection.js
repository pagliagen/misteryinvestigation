import React from "react";

const listBackground = {
  description: "Descrizione personale",
  ideology: "Ideologia/Credo",
  importantPeople: "Persone importanti",
  significantPlaces: "Posti significativi",
  valuables: "Oggetti di valore",
  traits: "Tratti caratteriali",
  wounds: "Ferite & Cicatrici",
  phobias: "Fobie & Manie",
  knowledge: "Tomi arcani, Incantesimi & Artefatti",
  meetings: "Incontri con Strane Entità",
};

function BackgroundSection({ payload, handleChangeSectionInfo }) {
  const handleUpdateSectionInfo = (e) => {
    if (!payload) return;

    handleChangeSectionInfo({
      target: {
        name: "background",
        value: {
          ...payload,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div className="character-create-form__sections_background">
      <h2>Background</h2>
      {Object.keys(listBackground).map((key) => (
        <div key={key} className="character-create-form__sections_background_info">
          <label htmlFor={key}>{listBackground[key]}</label>
          <textarea
            id={key}
            name={key}
            value={payload[key] || ''}
            onChange={handleUpdateSectionInfo}
          />
        </div>
      ))}
    </div>
  );
}

export default BackgroundSection;

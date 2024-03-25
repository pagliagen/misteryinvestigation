import React from "react";

function PointSection({ payload }) {
  if (!payload) return;

  const updatePayload = [
    { name: "Punti Ferita", value: 0, maxValue: 20 },
    { name: "Punti Magia", value: 0, maxValue: 20 },
    { name: "Punti Sanità", value: 0, maxValue: 100 },
    { name: "Punti Fortuna", value: 0, maxValue: 100 },
    { name: "Bonus al Danno", value: '-', maxValue: 100 },
    { name: "Struttura", value: '-', maxValue: 100 },
  ];
  payload.forEach((point) => {
    const index = updatePayload.findIndex((p) => p.name === point.name);
    if (index !== -1) {
      // Assicurati che l'indice sia valido prima di modificarlo
      updatePayload[index].value = point.value;
    }
  });

  return (
    <div className="character-create-form__sections_points">
      <h2>Stistiche Correlate</h2>
      {updatePayload.map((point) => (
        <div key={point.name} className="character-create-form__sections_field">
          <label htmlFor={point.name}>{point.name}</label>
          <span className="character-skillsection_points">
            <b>{point.value}</b>
          </span>
        </div>
      ))}
    </div>
  );
}

export default PointSection;

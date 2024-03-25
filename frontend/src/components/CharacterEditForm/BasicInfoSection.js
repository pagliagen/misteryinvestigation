import React from "react";

function BasicInfoSection({ payload, handleChangeSectionInfo }) {
  const handleUpdateSectionInfo = (e) => {
    if (!payload) return;

    handleChangeSectionInfo({
      target: {
        name: "characterInfo",
        value: {
          ...payload,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div className="character-create-form__sections_basicinfo">
      <div className="character-create-form__sections_field">
        <label htmlFor="name">Nome Personaggio:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={payload.name}
          required
          placeholder="Nome Personaggio"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div className="character-create-form__sections_field">
        <label htmlFor="education">Educazione:</label>
        <input
          type="text"
          id="education"
          name="education"
          value={payload.education}
          placeholder="Educazione"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div className="character-create-form__sections_field">
        <label htmlFor="work">Professione:</label>
        <input
          type="text"
          id="work"
          name="work"
          value={payload.work}
          placeholder="Professione"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div className="character-create-form__sections_field">
        <label htmlFor="birthplace">Luogo di Nascita:</label>
        <input
          type="text"
          id="birthplace"
          name="birthplace"
          value={payload.birthplace}
          placeholder="Luogo di Nascita"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div className="character-create-form__sections_field">
        <label htmlFor="bornage">Anno di Nascita:</label>
        <input
          type="text"
          id="bornage"
          name="bornage"
          value={payload.bornage}
          placeholder="Anno di Nascita"
          onChange={handleUpdateSectionInfo}
        />
      </div>
      <div className="character-create-form__sections_field">
        <label htmlFor="sex">Sesso:</label>
        <select
          id="sex"
          name="sex"
          value={payload.sex || "Maschio"}
          placeholder="Sesso"
          onChange={handleUpdateSectionInfo}
        >
          <option value="Maschio" defaultChecked>
            Maschio
          </option>
          <option value="Femmina">Femmina</option>
        </select>
      </div> 
    </div>

  );
}

export default BasicInfoSection;

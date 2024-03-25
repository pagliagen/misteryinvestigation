import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadAvatar, createNewCharacter } from "../services/characters";
import BasicInfoSection from "./CharacterEditForm/BasicInfoSection";
import CharacteristicsSection from "./CharacterEditForm/CharacteristicsSection";
import SkillsSection from "./CharacterEditForm/SkillsSection";
import WeaponSection from "./CharacterEditForm/WeaponSection";
import BackgroundSection from "./CharacterEditForm/BackgroundSection";
import EquipmentSection from "./CharacterEditForm/EquipmentSection";
import CashSection from "./CharacterEditForm/CashSection";
import PointSection from "./CharacterEditForm/PointSection";
import { useGlobalState } from "../context/GlobalStateContext";

function CharacterEditForm({ character, onSubmit }) {
  const [avatarPreviewImage, setAvatarPreviewImage] = useState(null);
  const [avatarFormInfo, setAvatarFormInfo] = useState(null);
  const [isValidPayload, setIsValidPayload] = useState(false);
  const [payload, setPayload] = useState({
    playerName: "",
    characterInfo: {},
    characteristics: {},
    points: [],
    skills: {},
    weapons: [],
    background: {},
    equipments: [],
    cash: {},
  });
  const [error, setError] = useState("");
  const { listCharacteristics, listSkills } = useGlobalState();

  const [sections, setSections] = useState({
    basicInfo: true,
    avatar: false,
    characteristics: false,
    skills: false,
    weapons: false,
    background: false,
    equipments: false,
    cash: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewCharacter(payload);
      navigate("/characters/list");
    } catch (error) {
      const errJson = JSON.parse(error.message);
      setError(errJson.error);
    }
  };

  const handleChangePlayerName = (e) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      playerName: e.target.value,
    }));
  };

  const handleChangeSectionInfo = (e) => {
    setIsValidPayload(false);

    const updatePayload = {
      ...payload,
      [e.target.name]: e.target.value,
    };

    if (e.target.name === "characteristics") {
      const points = updatePayload.points;

      let isValid = true;
      listCharacteristics?.forEach((c) => {
        const value = parseInt(e.target.value[c.name] || 0);
        if (value === 0) {
          isValid = false;
        }
      });
      setIsValidPayload(isValid);

      const puntiPotere = parseInt(
        updatePayload.characteristics["Potere"] || 0
      );
      const puntiCostituzione = parseInt(
        updatePayload.characteristics["Costituzione"] || 0
      );
      // const puntiForza = parseInt(updatePayload.characteristics["Forza"] || 0);
      const puntiTaglia = parseInt(
        updatePayload.characteristics["Taglia"] || 0
      );
      const puntiIntelligenza = parseInt(
        updatePayload.characteristics["Intelligenza"] || 0
      );
      const puntiDestrezza = parseInt(
        updatePayload.characteristics["Destrezza"] || 0
      );

      // Aggiorna i punti di magia, sanità e fortuna
      const pPotIndex = points.findIndex(
        (point) => point.name === "Punti Magia"
      );
      if (pPotIndex !== -1) {
        updatePayload["points"][pPotIndex].value = parseInt(puntiPotere / 5);
        updatePayload["points"][pPotIndex].maxValue = 18;
      } else {
        updatePayload["points"].push({
          name: "Punti Magia",
          value: parseInt(puntiPotere / 5),
          maxValue: 20,
        });
      }

      const pSanityIndex = points.findIndex(
        (point) => point.name === "Punti Sanità"
      );
      if (pSanityIndex !== -1) {
        updatePayload["points"][pSanityIndex].value = puntiPotere;
      } else {
        updatePayload["points"].push({
          name: "Punti Sanità",
          value: puntiPotere,
          maxValue: 100,
        });
      }

      const pFortunaIndex = points.findIndex(
        (point) => point.name === "Punti Fortuna"
      );
      if (pFortunaIndex !== -1) {
        updatePayload["points"][pFortunaIndex].value = puntiPotere;
      } else {
        updatePayload["points"].push({
          name: "Punti Fortuna",
          value: puntiPotere,
          maxValue: 100,
        });
      }

      // Aggiorna i punti ferita
      const pFeritaIndex = points.findIndex(
        (point) => point.name === "Punti Ferita"
      );
      const pf = 0.1 * (puntiCostituzione + puntiTaglia);
      if (pFeritaIndex !== -1) {
        updatePayload["points"][pFeritaIndex].value = parseInt(pf);
      } else {
        updatePayload["points"].push({
          name: "Punti Ferita",
          value: parseInt(pf),
          maxValue: 20,
        });
      }

      // Aggiorna i punti movimento
      updatePayload["points"]["Bonus al Danno"] = "+2";
      updatePayload["points"]["Struttura"] = 0;
      updatePayload["points"]["Movimento"] = 5 + parseInt(puntiDestrezza / 10);

      // Aggiorna le abilità
      listSkills?.forEach((skill) => {
        if (skill.name === "Lingua (Madre)") {
          skill.minValue = puntiIntelligenza;
          if (skill.value < skill.minValue) {
            skill.value = skill.minValue;
          }
        }
        if (skill.name === "Schivare") {
          skill.minValue = parseInt(puntiDestrezza / 2);
          if (skill.value < skill.minValue) {
            skill.value = skill.minValue;
          }
        }
      });
      console.log("updatePayload", updatePayload);
    }

    setPayload(updatePayload);
  };

  const toggleSection = (section) => {
    setSections((prevSections) => {
      const newSections = { ...prevSections };
      newSections[section] = !newSections[section];

      Object.keys(newSections).forEach((key) => {
        if (key !== section) {
          newSections[key] = false;
        }
      });

      return newSections;
    });
  };

  const uploadAvatar = async (e) => {
    if (avatarFormInfo) {
      console.log("UploadAvatar", payload._id, avatarFormInfo);
      UploadAvatar(payload._id, avatarFormInfo).then((res) => {
        console.log("UploadAvatar OK", res);
      });
    }
  };

  const handlePreviewAvatar = (e) => {
    setAvatarFormInfo(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      setAvatarPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="character-create-form">
      <form onSubmit={handleSubmit}>
        <section
          className={`character-create-form__sections ${
            sections.basicInfo ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("basicInfo")}>
            Informazioni di base
          </h2>
          <div hidden={!sections.basicInfo}>
            <div className="character-create-form__sections_field">
              <label htmlFor="name">Nome Giocatore:</label>
              <input
                type="text"
                id="player"
                name="player"
                value={payload.playerName || ""}
                required
                onChange={handleChangePlayerName}
              />
            </div>
            <BasicInfoSection
              payload={payload.characterInfo || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        {character && (
          <section
            className={`character-create-form__sections ${
              sections.avatar ? "section_selected" : ""
            }`}
          >
            <h2 onClick={() => toggleSection("avatar")}>Avatar</h2>
            <div hidden={!sections.avatar}>
              <div className="character-create-form__sections_field">
                <label htmlFor="avatar">Avatar:</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handlePreviewAvatar}
                />
                <button type="button" onClick={uploadAvatar}>
                  Carica
                </button>
                {avatarPreviewImage && (
                  <img src={avatarPreviewImage} alt="Avatar" />
                )}
              </div>
            </div>
          </section>
        )}
        <section
          className={`character-create-form__sections ${
            sections.characteristics ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("characteristics")}>
            Caratteristiche {isValidPayload ? "✅" : "❌"}
          </h2>
          <div hidden={!sections.characteristics}>
            <CharacteristicsSection
              listCharacteristics={listCharacteristics || []}
              payload={payload.characteristics || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
            <PointSection payload={payload.points || []} />
          </div>
        </section>
        <section
          className={`character-create-form__sections ${
            sections.skills ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("skills")}>Abilità e Conoscenze</h2>
          <div hidden={!sections.skills}>
            <SkillsSection
              payload={payload.skills || {}}
              listSkills={listSkills || []}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        <section
          className={`character-create-form__sections ${
            sections.weapons ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("weapons")}>Armi</h2>
          <div hidden={!sections.weapons}>
            <WeaponSection
              payload={payload.weapons || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        <section
          className={`character-create-form__sections ${
            sections.background ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("background")}>Trascorsi</h2>
          <div hidden={!sections.background}>
            <BackgroundSection
              payload={payload.background || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        <section
          className={`character-create-form__sections ${
            sections.equipments ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("equipments")}>
            Attrezzatura & Equipaggiamento
          </h2>
          <div hidden={!sections.equipments}>
            <EquipmentSection
              payload={payload.equipments || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        <section
          className={`character-create-form__sections ${
            sections.cash ? "section_selected" : ""
          }`}
        >
          <h2 onClick={() => toggleSection("cash")}>Contanti e Proprietà</h2>
          <div hidden={!sections.cash}>
            <CashSection
              payload={payload.cash || {}}
              handleChangeSectionInfo={handleChangeSectionInfo}
            />
          </div>
        </section>
        <div className="character-create-form__sections_buttons">
          <button type="submit">Salva Personaggio</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default CharacterEditForm;

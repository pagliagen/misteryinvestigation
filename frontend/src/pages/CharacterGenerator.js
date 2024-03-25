import React, { useEffect, useState } from "react";
import "./CharacterGenerator.css";
import Characteristics from "../components/CharacterGenerator/Characteristics";
import WorkAndSkills from "../components/CharacterGenerator/WorkAndSkills";
import { useGlobalState } from "../context/GlobalStateContext";
import Background from "../components/CharacterGenerator/Background";
import History from "../components/CharacterGenerator/History";
import Finance from "../components/CharacterGenerator/Finance";
import { createNewCharacter } from "../services/characters";
import Summary from "../components/CharacterGenerator/Summary";
import { useNavigate } from "react-router-dom";

function CharacterGenerator() {
  const { listCharacteristics, listSkills } = useGlobalState();

  const [character, setCharacter] = useState(null);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const tempCharacter = localStorage.getItem("character");
    if (tempCharacter) {
      setCharacter(JSON.parse(tempCharacter));
    } else {  
      setCharacter({
        playerName: "",
        images: {
          avatar: null,
        },
        characterInfo: {
          name: "",
          work: "",
          age: 15,
          sex: "Maschio",
          residence: "",
          bornage: 1920,
        },
        characteristics: listCharacteristics,
        points: [
          { name: "Punti Ferita", value: 0, maxValue: 0 },
          { name: "Punti Magia", value: 0, maxValue: 0 },
          { name: "Punti Sanità", value: 0, maxValue: 0 },
          { name: "Punti Fortuna", value: 0, maxValue: 0 },
          { name: "Bonus al Danno", value: "" },
          { name: "Struttura", value: 0 },
          { name: "Movimento", value: 0 },
        ],
        skills: listSkills,
        weapons: [],
        background: {
          description: "",
          ideology: "",
          importantPeople: "",
          significantPlaces: "",
          valuables: "",
          traits: "",
          wounds: "",
          phobias: "",
          knowledge: "",
          meetings: "",
        },
        equipments: [],
        cash: {
          spendinglevel: 0,
          cash: 0,
          properties: [],
        },
      });
    }
  }, [listCharacteristics, listSkills]);

  const steps = [
    {
      step: 1,
      title: "Caratteristiche",
      component: "Characteristics",
    },
    {
      step: 2,
      title: "Occupazione e Abilità",
      component: "WorkAndSkills",
    },
    {
      step: 3,
      title: "Background",
      component: "Background",
    },
    {
      step: 4,
      title: "Storia",
      component: "History",
    },
    {
      step: 5,
      title: "Finanze e Averi",
      component: "Finance",
    },
    {
      step: 6,
      title: "Riepilogo",
      component: "Summary",
    },
  ];

  const handleReset = () => {
    localStorage.removeItem("character"); 
    setCharacter({
      playerName: "",
      images: {
        avatar: null,
      },
      characterInfo: {
        name: "",
        work: "",
        age: 15,
        sex: "Maschio",
        residence: "",
        bornage: 1920,
      },
      characteristics: listCharacteristics,
      points: [
        { name: "Punti Ferita", value: 0, maxValue: 0 },
        { name: "Punti Magia", value: 0, maxValue: 0 },
        { name: "Punti Sanità", value: 0, maxValue: 0 },
        { name: "Punti Fortuna", value: 0, maxValue: 0 },
        { name: "Bonus al Danno", value: "" },
        { name: "Struttura", value: 0 },
        { name: "Movimento", value: 0 },
      ],
      skills: listSkills,
      weapons: [
        {
          name: "Disarmato",
          value: "-",
          damage: "1d3 + BD",
          range: "-",
          attacks: "1",
          ammo: "-",
          malfunction: "",
        },
      ],
      background: {
        description: "",
        ideology: "",
        importantPeople: "",
        significantPlaces: "",
        valuables: "",
        traits: "",
        wounds: "",
        phobias: "",
        knowledge: "",
        meetings: "",
      },
      equipments: [],
      cash: {
        spendinglevel: 0,
        cash: 0,
        properties: [],
      },
    });
    setStep(1);
  };

  const handleSetCharacter = (character) => {
    setCharacter({ ...character });
    setStep(step + 1);
    localStorage.setItem("character", JSON.stringify(character));
  };

  const handleCreateCharacter = async () => {
    const characterJSON = localStorage.getItem("character");
    const character = JSON.parse(characterJSON);
    try {
      await createNewCharacter(character);
      localStorage.removeItem("character");
      navigate("/characters/list");
    } catch (error) {
      alert(error.message)
    }
  }

  function renderStep(step) {
    const component = steps.find((s) => s.step === step).component;
    switch (component) {
      case "Characteristics":
        return (
          <Characteristics
            character={character}
            setCharacter={handleSetCharacter}
          />
        );
      case "WorkAndSkills":
        return (
          <WorkAndSkills
            character={character}
            setCharacter={handleSetCharacter}
          />
        );
      case "Background":
        return (
          <Background character={character} setCharacter={handleSetCharacter} />
        );
      case "History":
        return (
          <History character={character} setCharacter={handleSetCharacter} />
        );
      case "Finance":
        return (
          <Finance character={character} setCharacter={handleSetCharacter} />
        );
      case "Summary":
        return (
          <Summary character={character} saveCharacter={handleCreateCharacter} />
        );
      default:
        return null;
    }
  }

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-create-content">
      <div className="character-create-steps">
        <ul>
          {steps.map((s, i) => (
            <li
              key={i}
              className={step === s.step ? "active" : ""}
              onClick={() => setStep(s.step)}
            >
              {s.title}
            </li>
          ))}
        </ul>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
      {steps.filter((s) => s.step === step).map((s, i) => (
        <div
          key={i}
          className={step === s.step ? "active_form" : "hidden_form"}
        >
          {step === s.step ? renderStep(s.step) : null}
        </div>
      ))}
    </div>
  );
}

export default CharacterGenerator;

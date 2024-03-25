import React, { useEffect, useState } from "react";

function Characteristics({ character, setCharacter }) {
  const [diceRoll, setDiceRoll] = useState(null);
  const [age, setAge] = useState(15);
  const [ageNotice, setAgeNotice] = useState(
    "Riduci di 5 punti Forza o Taglia, e di 5 punti Istruzione. Tira due volte Fortuna e scegli il valore piu alto"
  );
  const [characteristics, setCharacteristics] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (character.characteristics) {
      setCharacteristics(character.characteristics);
    }
    if (character.points) {
      setPoints(character.points);
    }
  }, [character]);

  useEffect(() => {
    const characteristicsGetValue = (key) => {
      const row = characteristics.find(
        (characteristic) => characteristic.name === key
      );
      return parseInt(row?.value || 0);
    };

    const updatePointProperty = (name, value, maxValue) => {
      const point = points.find((point) => point.name === name);
      if (point) {
        if (value) point.value = value;
        if (maxValue) point.maxValue = maxValue;
      }
    };

    const evaluatePoints = () => {
      const puntiForza = characteristicsGetValue("Forza");
      const puntiDestrezza = characteristicsGetValue("Destrezza");
      const puntiPotere = characteristicsGetValue("Potere");
      const puntiTaglia = characteristicsGetValue("Taglia");

      const roll3d6 = roll() + roll() + roll();
      const pf = (puntiForza + puntiTaglia) / 10;
      updatePointProperty("Punti Sanità", puntiPotere, puntiPotere);
      updatePointProperty("Punti Magia", puntiPotere, puntiPotere);
      updatePointProperty("Punti Fortuna", roll3d6 * 5, 99);
      updatePointProperty("Punti Ferita", parseInt(pf), parseInt(pf));

      let bd = -2;
      let struttura = -2;
      if (puntiTaglia + puntiForza > 64) {
        bd = -1;
        struttura = -1;
      }
      if (puntiTaglia + puntiForza > 84) {
        bd = 0;
        struttura = 0;
      }
      if (puntiTaglia + puntiForza > 124) {
        bd = "1d4";
        struttura = 1;
      }
      if (puntiTaglia + puntiForza > 164) {
        bd = "1d6";
        struttura = 2;
      }

      let movimento = 7;
      if (puntiForza >= puntiTaglia || puntiDestrezza >= puntiTaglia) {
        movimento = 8;
      }
      if (puntiForza >= puntiTaglia && puntiDestrezza >= puntiTaglia) {
        movimento = 9;
      }

      updatePointProperty("Bonus al Danno", bd);
      updatePointProperty("Struttura", struttura);
      updatePointProperty("Movimento", movimento, movimento);
    };
    evaluatePoints();
  }, [characteristics, points]);

  const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handleDiceRoll = () => {
    const dice = {
      Blocco1: [],
      Blocco2: [],
    };

    for (let i = 0; i < 5; i++) {
      const value = 6 + roll() + roll();
      dice["Blocco1"].push(value * 5);
    }
    for (let i = 0; i < 3; i++) {
      const value = 6 + 6 + roll();
      dice["Blocco2"].push(value * 5);
    }
    setDiceRoll(dice);
  };

  const handleSaveStep = () => {
    console.log("**** handleSaveStep", characteristics);
    setCharacter({
      ...character,
      characteristics,
      points,
      characterInfo: { ...character.characterInfo, age },
    });
  };

  const handleChangCharacteristics = (key, value) => {
    const newCharacteristics = characteristics.map((item) => {
      if (item.name === key) {
        return { name: key, value: parseInt(value) };
      }
      return item;
    });
    newCharacteristics.map((item) => {
      const { name, value } = item;
      let adjustedValue = parseInt(value);

      if (value < 0) {
        adjustedValue = 0;
      } else if (value > 100) {
        adjustedValue = 100;
      }

      return { name, value: adjustedValue };
    });
    setCharacteristics(newCharacteristics);
  };

  const handleChangeAge = (e) => {
    e.preventDefault();
    const newAge = e.target.value;
    setAge(newAge);
    if (newAge > 39) {
      const diff = parseInt((newAge - 30) / 10);
      const movimento = points.find((point) => point.name === "Movimento");
      if (movimento) {
        const mov = movimento.maxValue;
        movimento.value = mov - diff;
      }
      setPoints([...points]);
    }
    if (newAge < 20) {
      setAgeNotice(
        "Riduci di 5 punti Forza o Taglia, e di 5 punti Istruzione. Tira due volte Fortuna e scegli il valore piu alto"
      );
    } else {
      setAgeNotice("Tira incremento su Istruzione");
      if (newAge >= 40) {
        setAgeNotice(
          "Riduci di 5 punti Forza, Costituzione o Destrezza (puoi distribuire fra tutte e tre). Riduci di 5 punti Fascino. Tira 2 incrementi su Istruzione"
        );
      }
      if (newAge >= 50) {
        setAgeNotice(
          "Riduci di 10 punti Forza, Costituzione o Destrezza (puoi distribuire fra tutte e tre). Riduci di 10 punti Fascino. Tira 3 incrementi su Istruzione"
        );
      }
      if (newAge >= 60) {
        setAgeNotice(
          "Riduci di 20 punti Forza, Costituzione o Destrezza (puoi distribuire fra tutte e tre). Riduci di 15 punti Fascino. Tira 4 incrementi su Istruzione"
        );
      }
      if (newAge >= 70) {
        setAgeNotice(
          "Riduci di 40 punti Forza, Costituzione o Destrezza (puoi distribuire fra tutte e tre). Riduci di 20 punti Fascino. Tira 4 incrementi su Istruzione"
        );
      }
      if (newAge >= 80) {
        setAgeNotice(
          "Riduci di 80 punti Forza, Costituzione o Destrezza (puoi distribuire fra tutte e tre). Riduci di 25 punti Fascino. Tira 4 incrementi su Istruzione"
        );
      }
    }
  };

  const saveButton = () => {
    let enableButton = false;
    if (character.characteristics) {
      Object.keys(characteristics).forEach((key) => {
        if (
          characteristics[key].value !== character.characteristics[key].value
        ) {
          enableButton = true;
        }
      });
    } else {
      enableButton = true;
    }
    if (enableButton) {
      return <button onClick={() => handleSaveStep()}>Salva e continua</button>;
    } else {
      return <button disabled>Salva e continua</button>;
    }
  };

  return (
    <div className="character-step-characteristics">
      <h2>Caratteristiche</h2>
      <div className="characteristics-rolldice">
        <button onClick={() => handleDiceRoll()}>
          Tira set Caratteristiche
        </button>
        <div className="characteristics-rolldice-temp">
          <div>
            <span>Forza, Costituzione, Destrezza, Fascino, Potere</span>
            <span>{JSON.stringify(diceRoll?.Blocco1 || [])}</span>
          </div>
          <div>
            <span>Intelligenza, Taglia, Istruzione</span>
            <span>{JSON.stringify(diceRoll?.Blocco2 || [])}</span>
          </div>
        </div>
      </div>
      <div className="characteristics-blocks">
        {characteristics.map((characteristic, index) => (
          <div key={index} className="characteristics-block">
            <h3>{characteristic.name}</h3>
            <div>
              <input
                type="number"
                value={characteristic.value}
                onChange={(e) =>
                  handleChangCharacteristics(characteristic.name, e.target.value)
                }
              />
            </div>
          </div>
        
        ))} 
      </div>
      <h2>Età del personaggio</h2>
      <div className="characteristics-age">
        <div>
          <input
            type="number"
            value={age}
            onChange={(e) => handleChangeAge(e)}
          />
        </div>
        <div className="characteristics-age-notice">{ageNotice}</div>
      </div>
      <div className="characteristics-submit">{saveButton()}</div>

      <h2>Attributi Derivati</h2>
      <div className="characteristics-points">
        {points &&
          points.map((point, index) => (
            <div key={index}>
              <h3>{point.name}</h3>
              <span>
                {point.value}
                {point.maxValue ? "/" + point.maxValue : null}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Characteristics;

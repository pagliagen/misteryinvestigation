import React, { useEffect, useState } from "react";

function Finance({ character, setCharacter }) {
  const [spendinglevel, setSpendinglevel] = useState(0);
  const [cash, setCash] = useState(0);
  const [properties, setProperties] = useState([]);
  const [spendingProperties, setSpendingProperties] = useState(0);
  const [equipments, setEquipments] = useState([]);
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    if (!character.skills) {
      return;
    }

    const row = character.skills.find(
      (row) => row.name === "Valore di credito"
    );
    let CR = 0;
    if (row) {
      CR = row.value;
    }

    let status = {
      cash: 0.5,
      assets: 0,
      sl: 0.05,
    };
    if (CR >= 1) {
      status = {
        cash: CR,
        assets: CR * 10,
        sl: 2,
      };
    }
    if (CR >= 10) {
      status = {
        cash: CR * 2,
        assets: CR * 50,
        sl: 10,
      };
    }
    if (CR >= 50) {
      status = {
        cash: CR * 5,
        assets: CR * 500,
        sl: 50,
      };
    }
    if (CR >= 90) {
      status = {
        cash: CR * 20,
        assets: CR * 2000,
        sl: 250,
      };
    }
    if (CR >= 99) {
      status = {
        cash: 50000,
        assets: 5000000,
        sl: 5000,
      };
    }

    if (character.cash) {
      setSpendinglevel(status.sl);
      setCash(status.cash);
      setProperties(character.cash.properties.join("\n"));
      setSpendingProperties(status.assets);
    }
    if (character.equipments) {
      setEquipments(character.equipments.join("\n"));
    }
    if (character.weapons) {
      setWeapons(character.weapons);
    }
  }, [character]);

  const handleSaveStep = () => {
    setCharacter({
      ...character,
      cash: {
        ...character.cash,
        spendinglevel,
        cash,
        properties: properties.split("\n").filter((e) => e !== ""),
      },
      equipments: equipments.split("\n").filter((e) => e !== ""),
      weapons
    });
  };

  const handleChangeValue = (index, key, value) => {
    const newWeapons = [...weapons];
    newWeapons[index][key] = value;
    setWeapons(newWeapons);
  };

  const handleAddWeapon = () => {
    setWeapons([
      ...weapons,
      {
        name: "",
        value: 0,
        damage: "",
        range: "",
        attacks: 0,
        ammo: "",
        malfunction: "",
      },
    ]);
  };

  const handleRemoveWeapon = (index) => {
    const newWeapons = [...weapons];
    newWeapons.splice(index, 1);
    setWeapons(newWeapons);
  };

  const saveButton = () => {
    return <button onClick={() => handleSaveStep()}>Salva e continua</button>;
  };

  return (
    <div className="character-step-finance">
      <div className="character-step-finance-content">
        <h2>Finanza</h2>
        <div className="finance-textarea">
          <label>Livello di spesa</label>
          <input
            type="number"
            value={spendinglevel}
            readOnly
            onChange={(e) => setSpendinglevel(e.target.value)}
          />
        </div>
        <div className="finance-textarea">
          <label>Denaro</label>
          <input
            type="number"
            value={cash}
            readOnly
            onChange={(e) => setCash(e.target.value)}
          />
        </div>
          <div className="finance-textarea">
            <label>Denaro spendibile in proprietà</label>
            <input
              type="number"
              value={spendingProperties}
              readOnly
              onChange={(e) => setSpendingProperties(e.target.value)}
            />
          </div>
        <div className="finance-textarea">
          <label>Proprietà</label>
          <textarea
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
          />
        </div>
        <h2>Equipaggiamento</h2>
        <div className="finance-textarea">
          <label>Equipaggiamento</label>
          <textarea
            value={equipments}
            onChange={(e) => setEquipments(e.target.value)}
          />
        </div>
        <h2>Armi</h2>
        <div className="finance-weapons">
          {weapons.map((w, i) => (
            <div key={i} className="finance-weapon">
              <div className="finance-weapon-block">
                <label>Nome</label>
                <input
                  type="text"
                  value={w.name}
                  onChange={(e) => handleChangeValue(i, "name", e.target.value)}
                />
              </div>
              <div className="finance-weapon-block">
                <label>Valore</label>
                <input
                  type="number"
                  value={w.value}
                  onChange={(e) =>
                    handleChangeValue(i, "value", e.target.value)
                  }
                />
              </div>
              <div className="finance-weapon-block">
                <label>Danno</label>
                <input
                  type="text"
                  value={w.damage}
                  onChange={(e) =>
                    handleChangeValue(i, "damage", e.target.value)
                  }
                />
              </div>
              <div className="finance-weapon-block">
                <label>Gittata</label>
                <input
                  type="text"
                  value={w.range}
                  onChange={(e) =>
                    handleChangeValue(i, "range", e.target.value)
                  }
                />
              </div>
              <div className="finance-weapon-block">
                <label>Attacchi</label>
                <input
                  type="number"
                  value={w.attacks}
                  onChange={(e) =>
                    handleChangeValue(i, "attacks", e.target.value)
                  }
                />
              </div>
              <div className="finance-weapon-block">
                <label>Munizioni</label>
                <input
                  type="text"
                  value={w.ammo}
                  onChange={(e) => handleChangeValue(i, "ammo", e.target.value)}
                />
              </div>
              <div className="finance-weapon-block">
                <label>Malfunzionamento</label>
                <input
                  type="text"
                  value={w.malfunction}
                  onChange={(e) =>
                    handleChangeValue(i, "malfunction", e.target.value)
                  }
                />
              </div>
              <div className="finance-weapon-block">
                <button onClick={() => handleRemoveWeapon(i)}>[C]</button>
              </div>
            </div>
          ))}
          <button onClick={() => handleAddWeapon()}>Aggiungi arma</button>
        </div>
      </div>
      <div className="background-submit">{saveButton()}</div>
    </div>
  );
}

export default Finance;

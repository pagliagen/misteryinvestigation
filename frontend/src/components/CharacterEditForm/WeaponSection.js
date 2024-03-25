import React, { useEffect, useState } from "react";

const listWeapons = [
  {
    name: "Disarmato",
    value: 0,
    damage: "1D3 + BD",
    range: "-",
    attacks: 1,
    ammo: "-",
    malfunction: "-",
  },
];

function WeaponSection({ payload, handleChangeSectionInfo }) {
  const [listCharacterWeapons, setListCharacterWeapons] = useState([]);
  const [tempWeapons, setTempWeapons] = useState([]);

  useEffect(() => {
    const combinedWeapons = [...listWeapons];
    if (payload) {
      payload.forEach((weapon) => {
        const weaponIndex = combinedWeapons.findIndex((w) => w.name === weapon.name);
        if (weaponIndex === -1) {
          combinedWeapons.push(weapon);
        } else {
          combinedWeapons[weaponIndex] = weapon;
        }
      });
    }
  
    combinedWeapons.sort((a, b) => a.name.localeCompare(b.name));
    setListCharacterWeapons(combinedWeapons);
    setTempWeapons(combinedWeapons);
  }, [payload]);

  const handleUpdateSectionInfo = (index, key, value) => {
    const updatedWeapons = [...tempWeapons];
    updatedWeapons[index] = {
      ...updatedWeapons[index],
      [key]: value,
    };
    setTempWeapons(updatedWeapons);
  };

  const handleSaveWeapon = (e, index) => {
    e.preventDefault();

    const updatedWeapons = [...listCharacterWeapons];
    updatedWeapons[index] = tempWeapons[index];
    setListCharacterWeapons(updatedWeapons);
    handleChangeSectionInfo({
      target: { name: "weapons", value: updatedWeapons },
    });
  };

  const handleRemoveWeapon = (e, index) => {
    e.preventDefault();
    const updatedWeapons = [...tempWeapons];
    updatedWeapons.splice(index, 1);
    setTempWeapons(updatedWeapons);
  };

  return (
    <div className="character-create-form__weapons">
      {tempWeapons.map((weapon, index) => (
        <div key={index} className="character-create-form__weapons_weapon">
          <div className="character-create-form__weapons_weapon_nameblock">
          <input
            type="text"
            id={`weapon-${index}-name`}
            className="character-create-form__weapons_weapon_name"
            value={weapon.name}
            placeholder="Nome Arma"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "name", e.target.value)
            }
          />
          </div>
          <div className="character-create-form__weapons_weapon_infoblock">
          <input
            type="number"
            id={`weapon-${index}-value`}
            className="character-create-form__weapons_weapon_value"
            value={weapon.value}
            placeholder="Valore"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "value", parseInt(e.target.value))
            }
          />
          <input
            type="text"
            id={`weapon-${index}-damage`}
            className="character-create-form__weapons_weapon_damage"
            value={weapon.damage}
            placeholder="Danno"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "damage", e.target.value)
            }
          />
          <input
            type="text"
            id={`weapon-${index}-range`}
            className="character-create-form__weapons_weapon_range"
            value={weapon.range}
            placeholder="Gittata"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "range", e.target.value)
            }
          />
          <input
            type="text"
            id={`weapon-${index}-attacks`}
            className="character-create-form__weapons_weapon_attacks"
            value={weapon.attacks}
            placeholder="Attacchi"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "attacks", e.target.value)
            }
          />
          <input
            type="text"
            id={`weapon-${index}-ammo`}
            className="character-create-form__weapons_weapon_ammo"
            value={weapon.ammo}
            placeholder="Munizioni"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "ammo", e.target.value)
            }
          />
          <input
            type="text"
            id={`weapon-${index}-malfunction`}
            className="character-create-form__weapons_weapon_malfunction"
            value={weapon.malfunction}
            placeholder="Malfunzionamento"
            onChange={(e) =>
              handleUpdateSectionInfo(index, "malfunction", e.target.value)
            }
          />
          </div>
          <div className="character-create-form__weapons_weapon_actions">
          <button onClick={(e) => handleSaveWeapon(e, index)}>Salva</button>
          <button onClick={(e) => handleRemoveWeapon(e, index)}>Rimuovi</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeaponSection;

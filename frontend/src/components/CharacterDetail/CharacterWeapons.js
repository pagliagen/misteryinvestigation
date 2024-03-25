import React from "react";

function CharacterWeapons({ weapons }) {
  return (
    <div className="character-sheetpage_weapons">
        {weapons.map((weapon) => (
          <div key={`weapons_${weapon._id}`}>
            <p>Nome: {weapon.name}</p>
            <p>Valore: {weapon.value}</p>
            <p>Danno: {weapon.damage}</p>
            <p>Gittata: {weapon.range}</p>
            <p>Attacchi: {weapon.attacks}</p>
            <p>Munizioni: {weapon.ammo}</p>
            <p>Malfunzionamento: {weapon.malfunction}</p>
          </div>
        ))}
      </div>
  );
}

export default CharacterWeapons;

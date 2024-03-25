import React from "react";

function CharacterCash({ cash }) {
  return (
    <div className="character-sheetpage_cash">
    <p>Livello di spesa: {cash.spendinglevel}</p>
    <p>Cash: {cash.cash}</p>
    <p>Proprietà: {cash.property}</p>
  </div>
  );
}

export default CharacterCash;

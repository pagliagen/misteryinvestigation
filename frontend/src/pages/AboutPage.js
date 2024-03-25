import React from "react";
import "./AboutPage.css";
import CharacterBackground from "../components/CharacterBackground";

function AboutPage() {
  return (
    <div className="aboutpage-page page-wrapper">
      <CharacterBackground />
      <div className="aboutpage-content">
        <h1>Chi Siamo</h1>
        <p>
          Benvenuti nel nostro sito dedicato al gioco di ruolo "Il Richiamo di Cthulhu"!
        </p>
        <p>
          Qui potete creare e personalizzare i vostri personaggi per la vostra prossima avventura nell'universo lovecraftiano.
        </p>
        <p>
          Il nostro obiettivo è fornire una piattaforma facile da usare dove i giocatori possano immergersi nel mondo dell'orrore cosmico e del mistero.
        </p>
        <h2>Contattaci</h2>
        <p>
          Se avete domande, suggerimenti o feedback, non esitate a contattarci:
        </p>
        <ul>
          <li>Email: gennaro.paglia@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;

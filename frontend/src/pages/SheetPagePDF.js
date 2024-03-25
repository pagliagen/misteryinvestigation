import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
import { getCharacterById } from '../services/characters';
// import CharacterDetailTemplate from '../components/CharacterDetail/CharacterDetailTemplate';
// import { renderToString } from 'react-dom/server';

function SheetPagePDF() {
  const { id } = useParams();

  const [message, setMessage] = useState(null);
 
  useEffect(() => {
    // Ottieni i dettagli del personaggio dal backend al caricamento della pagina
    getCharacterById(id)
      .then((data) => {
        /*
        const opt = {
          margin: 1,
          filename: 'character_detail.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        const htmlContent = `
          <div>${renderToString(<CharacterDetailTemplate character={data} />)}</div>
        `;
    
        html2pdf().from(htmlContent).set(opt).save();
        */
        setMessage('Stampa effettuata')
      })
      .catch((error) => {
        setMessage(`Errore durante la stampa della scheda personaggio: ${error.message}`);
      });
  }, [id]);
 
  return (
    <div className="character-list-content">
      {message ? <div>{message}</div> : <div>Stampa in corso...</div>}
    </div>
  );
}

export default SheetPagePDF

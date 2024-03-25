const fs = require("fs");
const { loadImage } = require("canvas");
const path = require("path");

const imageHeader = async (page, canvas, ctx) => {
  const background = await loadImage(
    `${__dirname}/../../../assets/images/charactersheet/page_${page}.jpg`
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000"; // Colore del testo nero
};

const saveFile = async (data, page, canvas) => {
  return new Promise(async (resolve, reject) => {
    const imagePath = `${__dirname}/../../../character_images/${data._id}/page_${page}.jpg`;
    const characterFolder = path.dirname(imagePath);
    if (!fs.existsSync(characterFolder)) {
      fs.mkdirSync(characterFolder, { recursive: true });
    }
    const out = fs.createWriteStream(imagePath);
    const stream = canvas.createJPEGStream({ quality: 1 });
    stream.pipe(out);
    out.on("finish", () => {
      resolve(path.resolve(imagePath));
    });
  });
};

const splitTextIntoLines = (text, maxLineLength) => {
  const lines = text.split("\n"); // Dividi il testo in righe utilizzando l'EOL
  const splitLines = [];

  lines.forEach((line) => {
    let currentLine = "";
    const words = line.split(" "); // Dividi la riga in parole

    words.forEach((word) => {
      // Se la lunghezza della riga corrente più la lunghezza della prossima parola supera maxLineLength, salva la riga corrente e inizia una nuova riga
      if (currentLine.length + word.length > maxLineLength) {
        splitLines.push(currentLine.trim()); // Aggiungi la riga corrente all'array delle righe
        currentLine = ""; // Resetta la riga corrente
      }
      currentLine += (currentLine ? " " : "") + word; // Aggiungi la parola alla riga corrente
    });

    // Aggiungi l'ultima riga (potrebbe non essere completa)
    if (currentLine) {
      splitLines.push(currentLine.trim());
    }
  });

  return splitLines;
};

module.exports = { imageHeader, saveFile, splitTextIntoLines };

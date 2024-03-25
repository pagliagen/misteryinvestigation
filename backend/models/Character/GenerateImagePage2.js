const {
  imageHeader,
  saveFile,
  splitTextIntoLines,
} = require("./GenerateImageUtils");

const generateImagePage2 = async (data, canvas, ctx) => {
  return new Promise(async (resolve, reject) => {
    await imageHeader(2, canvas, ctx);

    // Disegna il testo
    ctx.font = "35px Arial";
    const arrayBackgrounds = [];
    arrayBackgrounds.push({
      label: "Descrizione Personale",
      value: splitTextIntoLines(
        data.background.description || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Ideologia/Credo",
      value: splitTextIntoLines(
        data.background.ideology || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Persone importanti",
      value: splitTextIntoLines(
        data.background.importantPeople || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Luoghi significativi",
      value: splitTextIntoLines(
        data.background.significantPlaces || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Oggetti di valore",
      value: splitTextIntoLines(
        data.background.valuables || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Tratti",
      value: splitTextIntoLines(
        data.background.traits || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Ferite & Cicatrici",
      value: splitTextIntoLines(
        data.background.wounds || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Foibe & Manie",
      value: splitTextIntoLines(
        data.background.phobias || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Tomi arcani, Incantesimi & Artefatti",
      value: splitTextIntoLines(
        data.background.knowledge || "Informazioni non inserite",
        70
      ),
    });
    arrayBackgrounds.push({
      label: "Incontri con Strane Entità",
      value: splitTextIntoLines(
        data.background.meetings || "Informazioni non inserite",
        70
      ),
    });

    let startY = 450;
    let startX = 250;
    for (const row of arrayBackgrounds) {
      if (startX > 2000) {
        break;
      }

      ctx.font = "40px Arial";
      ctx.fillText(row["label"], startX, startY);
      if (startY > 1700) {
        startY = 450;
        startX += 1000;
      } else {
        startY += 60;
      }
      if (startX > 2000) {
        break;
      }

      ctx.font = "30px Arial";
      for (const line of row["value"]) {
        if (startX > 2000) {
          break;
        }
        ctx.fillText(line, startX, startY);
        if (startY > 1700) {
          startY = 450;
          startX += 1000;
        } else {
          startY += 40;
        }
      }

      if (startY > 1700) {
        startY = 450;
        startX += 1000;
      } else {
        startY += 40;
      }
    }

    const arrayEquipments = [];
    for (const row of data.equipments || []) {
      const lines = splitTextIntoLines(row, 95);
      for (const line of lines) {
        arrayEquipments.push(line);
      }
      arrayEquipments.push("[line]");
    }

    startY = 2000;
    ctx.font = "30px Arial";
    for (const row of arrayEquipments) {
      if (row === "[line]") {
        ctx.beginPath();
        ctx.moveTo(250, startY - 20);
        ctx.lineTo(1300, startY - 20);
        ctx.stroke();
      } else {
        ctx.fillText(row, 250, startY);
      }
      startY += 40;
      if (startY > 3300) {
        break;
      }
    }

    ctx.font = "40px Arial";
    ctx.fillText((data.cash.spendinglevel || 0) + "$", 1800, 2000);
    ctx.fillText((data.cash.cash || "0") + "$", 1800, 2060);

    startY = 2200;
    ctx.font = "30px Arial";
    for (const row of data.cash.properties) {
      const lines = splitTextIntoLines(row, 55);
      for (const line of lines) {
        ctx.fillText(row, 1450, startY);
      startY += 40;
      if (startY > 3300) {
        break;
      }
      }
    }

    const imagePath = await saveFile(data, 2, canvas);
    resolve(imagePath);
  });
};

module.exports = generateImagePage2;

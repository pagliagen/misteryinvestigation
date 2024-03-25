const { loadImage } = require("canvas");
const { imageHeader, saveFile } = require("./GenerateImageUtils");

const generateImagePage1 = async (data, canvas, ctx) => {
  return new Promise(async (resolve, reject) => {
    await imageHeader(1, canvas, ctx);

    // Disegna il testo
    ctx.font = "35px Arial";
    ctx.fillText(data.playerName, 476, 460);
    ctx.fillText(data.characterInfo.name || "-", 332, 390);
    ctx.fillText(data.characterInfo.work || "-", 432, 530);
    ctx.fillText(data.characterInfo.age || "-", 292, 600);
    ctx.fillText(data.characterInfo.sex || "-", 536, 600);
    ctx.fillText(data.characterInfo.residence || "-", 432, 670);
    ctx.fillText(data.characterInfo.bornage || "-", 356, 740);

    if (data.images.avatar) {
      const avatar = await loadImage(`${data.images.avatar}`);
      ctx.drawImage(avatar, 1873, 272, 396, 517);
    }

    const characteristics = data.characteristics.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    const skills = data.skills.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});

    // Disegna le caratteristiche
    ctx.font = "50px Arial";
    ctx.fillText(characteristics["Forza"] || "FOR", 950, 460);
    ctx.fillText(characteristics["Costituzione"] || "COS", 950, 600);
    ctx.fillText(characteristics["Taglia"] || "TAG", 950, 740);
    ctx.fillText(characteristics["Destrezza"] || "DEC", 1315, 460);
    ctx.fillText(characteristics["Fascino"] || "FAS", 1315, 600);
    ctx.fillText(characteristics["Istruzione"] || "IST", 1315, 740);
    ctx.fillText(characteristics["Intelligenza"] || "INT", 1680, 460);
    ctx.fillText(characteristics["Potere"] || "POT", 1680, 600);

    // Disegna i punti magia e i punti ferita
    const points = data.points.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    const mitiDiCthulhu = skills["Miti di Cthulhu"] || 0;
    const schivare = skills["Schivare"] || 0;

    ctx.font = "35px Arial";
    ctx.fillText(points["Movimento"] || "-", 1680, 740);
    ctx.fillText(points["Punti Magia"] || "-", 540, 867); // Punti Magia
    ctx.fillText(points["Punti Sanità"] || "-", 1050, 867); // Punti Sanità (Inizio)
    ctx.fillText(
      characteristics["Potere"] || 0 - mitiDiCthulhu,
      1250,
      867
    ); // Punti Sanità (Massimo)
    ctx.fillText(points["Punti Ferita"] || "-", 560, 1165); // Punti Ferita (Massimo)

    let startY = 1530;
    let startX = 300;
    for (const skill of data.skills) {
      ctx.font = "30px Arial";
      const skillNames = skill.name.split("(") || ['nome'];
      let fullName = skillNames[0]
      if (skillNames[1]) {
        fullName += `\n(${skillNames[1]}`;
        ctx.fillText(fullName, startX, startY);
      } else {
        ctx.fillText(fullName, startX, startY + 20);
      }
      
      ctx.font = "40px Arial";
      ctx.fillText(skill.value, startX + 320, startY + 20);
      if (startY > 2700) {
        startY = 1530;
        startX += 510;
      } else {
        startY += 86;
      }
    }

    startY = 2974;
    startX = 330;
    ctx.font = "35px Arial";
    for (const w of data.weapons || []) {
      ctx.fillText(w["name"], startX, startY);
      ctx.fillText(w["value"], startX + 530, startY);
      ctx.fillText(w["damage"], startX + 680, startY);
      ctx.fillText(w["range"], startX + 900, startY);
      ctx.fillText(w["attacks"], startX + 1100, startY);
      ctx.fillText(w["ammo"], startX + 1250, startY);
      ctx.fillText(w["malfunction"], startX + 1400, startY);
      startY += 64;
    }

    ctx.font = "50px Arial";
    ctx.fillText(points["Bonus al Danno"] || "-", 2100, 3020);
    ctx.fillText(points["Struttura"] || "-", 2100, 3155);
    ctx.fillText(schivare, 2100, 3290);

    const imagePath = await saveFile(data, 1, canvas);
    resolve(imagePath);
  });
};

module.exports = generateImagePage1;

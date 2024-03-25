const mongoose = require("mongoose");
const mysql = require("mysql");
const fs = require("fs");
const { config } = require("./config");
const User = require("./backend/models/User");
const Character = require("./backend/models/Character");

mongoose.connect(`mongodb://127.0.0.1:27017/${config.db.name}`);

let connection = null;
let characters = [];

if (fs.existsSync("database.json")) {
  console.log("File database.json trovato");
  characters = JSON.parse(fs.readFileSync("database.json", "utf8"));
} else {
  console.log("File database.json non trovato");
  connection = mysql.createConnection({
    host: "localhost", // Indirizzo del server MySQL
    user: "gennaro", // Nome utente del database MySQL
    password: "password", // Password del database MySQL
    database: "misteryinvestigation", // Nome del database MySQL
  });

  connection.connect((err) => {
    if (err) {
      console.error("Errore di connessione al database MySQL:", err);
      return;
    }
    console.log("Connessione al database MySQL riuscita");

    connection.query(
      "SELECT name, json_data, created, JSON_EXTRACT(json_data, '$.username') AS username, JSON_EXTRACT(json_data, '$.character.name') AS character_name FROM characters WHERE JSON_VALID(json_data)",
      (err, results, fields) => {
        if (err) {
          console.error("Errore durante l'esecuzione della query:", err);
          return;
        }

        results.forEach((c) => {
          c.username = c.username.replace(/"/g, "");
          c.character_name = c.character_name.replace(/"/g, "");

          if (c.username === "paul") c.username = "paolo";
          if (c.username === "almawt") c.username = "pierluigi";
          if (c.username === "giorgia2") c.username = "giorgia";
          if (c.username === "federico2") {
            c.username = "federico";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "luigi2") {
            c.username = "luigi";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "paolo2") {
            c.username = "paolo";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "piergigi2" || c.username === "piergigi") {
            c.username = "pierluigi";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "salvatore2") {
            c.username = "salvatore";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "gennaro2") {
            c.username = "gennaro";
            c.character_name = c.character_name + " (Fusione)";
          }
          if (c.username === "vitor") {
            c.username = "silvio";
          }

          c.isMaster = false;
          c.isAdmin = false;
          switch (c.username) {
            case "silvio":
              c.email = "silvestro.deangelis@gmail.com";
              c.isMaster = true;
              break;
            case "gennaro":
              c.email = "gennaro.paglia@gmail.com";
              c.isMaster = true;
              c.isAdmin = true;
              break;
            case "paolo":
              c.email = `mchawk@gmail.com`;
              break;
            case "pierluigi":
              c.email = `pierluigi.frattasi@gmail.com`;
              break;
            case "federico":
              c.email = `procionegobbo@gmail.com`;
              break;
            case "salvatore":
              c.email = `salvatore.amoriello@gmail.com`;
              break;
            case "luigi":
              c.email = `luigi.martini.ita@gmail.com`;
              break;
            default:
              c.email = `gennaro.paglia+${c.username}@gmail.com`;
              break;
          }
          characters.push(c);
        });

        createModels().then(() => {
          // Avvia la funzione per inserire i file audio nel database
          fs.writeFileSync(
            "database.json",
            JSON.stringify(characters, null, 2),
            "utf8"
          );
          mongoose.connection.close();
          connection.end();
        });
      }
    );
  });
}

const createModels = async () => {
  console.log("Inizio a creare i modelli");

  await User.deleteMany();
  await Character.deleteMany();

  for (let c of characters) {
    let user = await User.findOne({ username: c.username });
    if (!user) {
      user = await User.create({
        username: c.username,
        email: c.email,
        password: "hdmi",
        isAdmin: c.isAdmin || false,
        isMaster: c.isMaster || false,
      });
      await user.save();
    }

    const payload = JSON.parse(c.json_data);
    if (c.character_name.includes("Fusione")) {
      payload.character.avatar = "heath.jpg";
    }
    if (c.character_name.includes("Jack")) {
      payload.character.avatar = "jack_price.jpg";
    }
    if (c.character_name === "Frank Price (Fusione)") {
      c.character_name = "Heath Callahan/Frank Price (Fusione)";
    }
    if (c.character_name.includes("Callahan")) {
      payload.character.avatar = "heath.jpg";
    }

    const characterInfo = {
      name: c.character_name,
      education: "-",
      work: payload.character.work,
      birthplace: payload.character.residence,
      bornage: payload.character.bornage,
      age: payload.character.age,
      sex: payload.character.sex,
    };
    const characteristics = [];
    characteristics.push({
      name: "Forza",
      value: parseInt(payload.traits.for),
    });
    characteristics.push({
      name: "Costituzione",
      value: parseInt(payload.traits.cos),
    });
    characteristics.push({
      name: "Taglia",
      value: parseInt(payload.traits.tag),
    });
    characteristics.push({
      name: "Destrezza",
      value: parseInt(payload.traits.des),
    });
    characteristics.push({
      name: "Fascino",
      value: parseInt(payload.traits.fas),
    });
    characteristics.push({
      name: "Istruzione",
      value: parseInt(payload.traits.ist),
    });
    characteristics.push({
      name: "Intelligenza",
      value: parseInt(payload.traits.int),
    });
    characteristics.push({
      name: "Potere",
      value: parseInt(payload.traits.pot),
    });

    const points = [];
    points.push({
      name: "Punti Ferita",
      value: parseInt(payload.pf.value),
      maxValue: parseInt(payload.pf.value),
    });
    points.push({
      name: "Punti Magia",
      value: parseInt(payload.pf.value),
      maxValue: parseInt(payload.pf.value),
    });
    points.push({
      name: "Punti Sanità",
      value: parseInt(payload.ps.value),
      maxValue: parseInt(payload.ps.value),
    });
    points.push({
      name: "Punti Fortuna",
      value: parseInt(payload.fortuna.value),
      maxValue: parseInt(payload.traits.pot),
    });
    points.push({ name: "Bonus al Danno", value: payload.fighting.bonusdanno });
    points.push({ name: "Struttura", value: payload.fighting.struttura });
    points.push({ name: "Movimento", value: payload.traits.mov });

    const weapons = [];
    for (let id in payload.weapon) {
      const w = payload.weapon[id];
      if (w.nome == '') continue;
      weapons.push({
        name: w.nome,
        value: w.punteggio == '' ? 0 : w.punteggio,
        damage: w.danno == '' ? '-' : w.danno,
        range: w.gittata == '' ? '-' : w.gittata,
        attacks: w.attacchi == '' ? '-' : w.attacchi,
        ammo: w.munizioni == '' ? '-' : w.munizioni,
        malfunction: w.malfunzionamento == '' ? '-' : w.malfunzionamento,
      });
    }

    const background = {
      description: payload.background.descrizione.replace(/\r?\n/g, ""),
      ideology: payload.background.ideologia.replace(/\r?\n/g, ""),
      importantPeople: payload.background.persone.replace(/\r?\n/g, ""),
      significantPlaces: payload.background.luoghi.replace(/\r?\n/g, ""),
      valuables: payload.background.oggetti.replace(/\r?\n/g, ""),
      traits: payload.background.tratti.replace(/\r?\n/g, ""),
      wounds: payload.background.ferite.replace(/\r?\n/g, ""),
      phobias: payload.background.fobie.replace(/\r?\n/g, ""),
      knowledge: payload.background.arcano.replace(/\r?\n/g, ""),
      meetings: payload.background.incontri.replace(/\r?\n/g, ""),
    };

    const equipments = [];

    const attrezzatura = payload.oggetti.attrezzatura.split("\r\n");
    for (let a of attrezzatura) equipments.push(a);
    const equipaggiamento = payload.oggetti.equipaggiamento.split("\r\n");
    for (let e of equipaggiamento) equipments.push(e);

    const cash = {
      spendinglevel: payload.contanti.livellospesa,
      cash: payload.contanti.contante,
      properties: payload.contanti.proprieta.split("\r\n"),
    };

    const sortedSkills = Object.values(payload.skill).filter(
      (item) => item.name.trim() !== ""
    );
    sortedSkills.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const newCharacter = await Character.create({
      playerName: c.username,
      created: c.created,
      characterInfo,
      characteristics,
      points,
      weapons,
      background,
      equipments,
      cash,
      skills: sortedSkills,
      user: user._id,
    });
    await newCharacter.save();

    user.characters.push(newCharacter);
    await user.save();

    const linkAvatar = payload.character.avatar;
    const arrTemp = linkAvatar.split("/");
    const fileName = arrTemp[arrTemp.length - 1];
    const sourcePath = `./assets/images/old_avatar/${fileName}`;
    const sourceFile = fs.readFileSync(sourcePath, "base64");
    newCharacter.images.avatar = `data:image/jpeg;base64,${sourceFile}`;
    await newCharacter.save();
    await newCharacter.generateAndSaveImage();
  }

  console.log("Modelli creati con successo");

  const Table = require("cli-table");
  const table = new Table({
    head: ["Username", "Email", "Is Master", "Is Admin"],
  });

  // Aggiungi righe alla tabella
  const listC = await User.find().sort({ username: 1 });
  listC.forEach((c) => {
    table.push([c.username, c.email, c.isMaster, c.isAdmin]);
  });

  // Visualizza la tabella
  console.log(table.toString());
};

if (!connection) {
  createModels().then(() => {
    // Avvia la funzione per inserire i file audio nel database
    mongoose.connection.close();
  });
}

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const AudioFile = require("./backend/models/AudioFile");
const { config } = require("./config");

// Collegamento al database
mongoose.connect(`mongodb://localhost:27017/${config.db.name}`);

// Importa lo schema e il modello direttamente dal file

// Funzione per leggere i file audio e inserirli nel database
async function insertAudioFiles(directoryPath) {
  try {
    const folders = fs.readdirSync(directoryPath, { withFileTypes: true });
    for (const folder of folders) {
      if (folder.isDirectory()) {
        const folderName = folder.name;
        const files = fs.readdirSync(path.join(directoryPath, folderName));
        console.log(`Files in ${folderName} folder:`, files.length);
        for (const file of files) {
          const filePath = path.join(directoryPath, folderName, file);
          if (path.extname(file) === ".mp3") {
            const relativeFilePath = path.relative(directoryPath, filePath);
            const audioFilePath =
              "/audios/" + relativeFilePath.replace(/\\/g, "/");
            const groupName = folderName.replace(/_/g, " ");
            const fileTitle = path
              .parse(file)
              .name.replace(/_/g, " ")
              .replace(/\d+/g, "")
              .replace(" ('')", "")
              .trim();
            await AudioFile.create({
              fileTitle,
              filePath: audioFilePath,
              groupName,
            });
            console.log(
              `File ${groupName}/${fileTitle} inserito nel database. [path ${audioFilePath}]`
            );
          }
        }
      }
    }
  } catch (error) {
    console.error(
      "Errore durante l'inserimento dei file audio nel database:",
      error
    );
  }
}

// Svuota la tabella prima di inserire i nuovi dati
async function truncateAudioFiles() {
  try {
    await AudioFile.deleteMany();
    console.log("Tabella AudioFile svuotata.");
  } catch (error) {
    console.error(
      "Errore durante la troncatura della tabella AudioFile:",
      error
    );
  }
}

// Avvia la funzione per svuotare la tabella prima di inserire i file audio
truncateAudioFiles().then(() => {
  // Avvia la funzione per inserire i file audio nel database
  insertAudioFiles(path.join(__dirname, "./audios")).then(() => {
    mongoose.connection.close();
  });
});

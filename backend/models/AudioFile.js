const mongoose = require("mongoose");

// Definizione dello schema per i file audio
const AudioFilechema = new mongoose.Schema({
  groupName: { type: String, required: true },
  fileTitle: { type: String, required: true },
  filePath: { type: String, required: true },
  description: { type: String },
});

// Crea il modello AudioFile utilizzando lo schema definito
const AudioFile = mongoose.model("AudioFile", AudioFilechema);

module.exports = AudioFile;

const mongoose = require("mongoose");
const fs = require("fs");
const { createCanvas } = require("canvas");
const generateImagePage1 = require("./Character/GenerateImagePage1");
const generateImagePage2 = require("./Character/GenerateImagePage2");

// Definizione dello schema per il modello Character
const characterSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  created: { type: Date, default: Date.now },
  images: {
    avatar: { type: String },
    page_1: { type: String },
    page_2: { type: String },
  },
  characterInfo: {
    name: { type: String, required: true },
    education: { type: String },
    age: { type: String },
    sex: { type: String },
    work: { type: String },
    birthplace: { type: String },
    bornage: { type: String }, 
  },
  characteristics: { type: mongoose.Schema.Types.Mixed },
  skills: { type: mongoose.Schema.Types.Mixed },
  points: [{ type: mongoose.Schema.Types.Mixed }],
  weapons: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
      damage: { type: String },
      range: { type: String },
      attacks: { type: String },
      ammo: { type: String },
      malfunction: { type: String },
    },
  ],
  background: {
    description: { type: String },
    ideology: { type: String },
    importantPeople: { type: String },
    significantPlaces: { type: String },
    valuables: { type: String },
    traits: { type: String },
    wounds: { type: String },
    phobias: { type: String },
    knowledge: { type: String },
    meetings: { type: String },
  },
  equipments: [{ type: String }],
  cash: {
    spendinglevel: { type: String },
    cash: { type: String },
    properties: [{ type: String }],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Funzione per generare e salvare un'immagine del personaggio
characterSchema.methods.generateAndSaveImage = async function () {
  const canvas = createCanvas(2480, 3507);
  const ctx = canvas.getContext("2d");

  const pathImage1 = await generateImagePage1(this, canvas, ctx);
  const pathImage2 = await generateImagePage2(this, canvas, ctx);

  const imagePage1Data = fs.readFileSync(pathImage1,'base64');
  const imagePage2Data = fs.readFileSync(pathImage2,'base64');

  this.images = {
    ...this.images,
    page_1: `data:image/jpeg;base64,${imagePage1Data}`,
    page_2: `data:image/jpeg;base64,${imagePage2Data}`,
  };
  await this.save();

  return {
    page_1: pathImage1,
    page_2: pathImage2,
  };
};

// Crea il modello Character utilizzando lo schema definito
const Character = mongoose.model("Character", characterSchema);

// Esporta il modello Character per essere utilizzato altrove nel tuo codice
module.exports = Character;

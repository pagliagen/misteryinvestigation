const mongoose = require("mongoose");
const mysql = require("mysql");
const fs = require("fs");
const { config } = require("./config");
const User = require("./backend/models/User");
const Character = require("./backend/models/Character");

mongoose.connect(`mongodb://127.0.0.1:27017/${config.db.name}`);

const createModels = async () => {
  console.log("Legge i personaggi");

  const listCharacters = await Character.find();
  for (let c of listCharacters) {
    console.log(c._id, c.playerName, c.characterInfo.name);
    await c.generateAndSaveImage();
  }
};

createModels().then(() => {
  mongoose.connection.close();
});

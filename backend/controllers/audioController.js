const AudioFile = require("../models/AudioFile");
const fs = require("fs");
const { config } = require("../../config");

const AudioController = {
  // Funzione di callback per ottenere tutti i personaggi
  getListFiles: async (req, res) => {
    try {
      const audioFiles = await AudioFile.find();
      res.status(200).json(audioFiles);
    } catch (error) {
      console.error("Error fetching user characters:", error);
      res
        .status(500)
        .json({ error: "Error fetching user characters" + error.message });
    }
  },

  uploadFile: async (req, res) => {
    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if (!req.body.groupName) {
      return res.status(400).send({ message: "Please provide a group name!" });
    }
    if (!req.body.filePath) {
      return res.status(400).send({ message: "Please provide a file path!" });
    }

    const file = req.file;
    const groupName = req.body.groupName;
    const uploadDir =
      req.body.filePath[0] === "/"
        ? req.body.filePath.substring(1)
        : req.body.filePath;

    if (!fs.existsSync(config.server.basePath + uploadDir)) {
      fs.mkdirSync(config.server.basePath + uploadDir, true);
    }
    fs.copyFileSync(
      `${config.server.tmpDir}/${file.originalname}`,
      `${config.server.basePath}${uploadDir}/${file.originalname}`
    );

    await AudioFile.create({
      fileTitle: file.originalname,
      filePath: `/${uploadDir}/${file.originalname}`,
      groupName: groupName,
    });
    res.status(200).json({ message: "File uploaded successfully" });
  },
};

module.exports = AudioController;

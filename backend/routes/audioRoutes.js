const express = require("express");
const multer = require("multer");
const router = express.Router();
const AudioController = require("../controllers/audioController");
const { config } = require('../../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.server.tmpDir); // Directory di destinazione per i file caricati
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only MP3 files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

// Rotte per l'autenticazione
router.get("/list", AudioController.getListFiles);
router.post("/upload", upload.single("file"), AudioController.uploadFile);

module.exports = router;

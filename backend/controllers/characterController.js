const User = require("../models/User");
const Character = require("../models/Character"); 
const { default: slugify } = require("slugify"); 
const fs = require("fs");

const UserController = { 
  // Funzione di callback per ottenere tutti i personaggi
  getUserCharacters: async (req, res) => {
    try {
      const userId = req.userId
      const user = await User.findOne({ _id: userId }).populate({
        path: "characters",
        options: { sort: { created: -1 } },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userInfo = {
        username: user.username,
        isMaster: user.isMaster,
        isAdmin: user.isAdmin,
      }

      res.status(200).json({user: userInfo, characters: user.characters || []});
    } catch (error) {
      console.error("Error fetching user characters:", error);
      res
        .status(500)
        .json({ error: "Error fetching user characters" + error.message });
    }
  },

  getImageById: async (req, res) => {
    const { id, page } = req.params;

    try {
      const character = await Character.findOne({ _id: id });
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
      const fileName = slugify(
        character.characterInfo.name.toLocaleLowerCase()
      );

      const imagePaths = await character.generateAndSaveImage();
      res
        .status(200)
        .set("Content-Type", "image/jpeg")
        .set(
          "Content-Disposition",
          `inline; filename="${fileName}_${page}.jpg"`
        )
        .sendFile(imagePaths["page_" + page]);
    } catch (error) {
      console.error("Error fetching character image by id:", error);
      res
        .status(500)
        .json({
          error: "Error fetching character image by id" + error.message,
        });
    }
  },

  getCharacterById: async (req, res) => {
    try {
      const userId = req.userId
      const { id } = req.params;

      const character = await Character.findOne({ _id: id, user: userId });
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }

      res.status(200).json(character);
    } catch (error) {
      console.error("Error fetching character by id:", error);
      res
        .status(500)
        .json({ error: "Error fetching character by id" + error.message });
    }
  },

  uploadAvatar: async (req, res) => {
    const userId = req.userId
    const { id } = req.params;
    const { avatar } = req.body;

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { file } = req;
      if (!file) {
        return res.status(400).json({ error: "Avatar file not provided" });
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/'); // Directory in cui verranno salvati i file
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)); // Genera un nome univoco per il file
        }
      });
      const upload = multer({ storage: storage });
      const response = await upload.single('file')      
      console.log(response)

      user.avatar = file.path;
      await user.save();

      res.status(200).json({ avatar: file.path });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      res.status(500).json({ error: "Error uploading avatar" + error.message });
    }
  },

  createNewCharacter: async (req, res) => {
    try {
      const userId = req.userId
      const { data } = req.body;

      const newCharacter = new Character({ ...data, user: userId });
      await newCharacter.save();

      const user = await User.findOne({ _id: userId });
      user.characters.push(newCharacter);
      await user.save();

      await newCharacter.generateAndSaveImage();

      const newDate = new Date();
      const folderBackup = `./backups/${newCharacter._id}`;
      fs.mkdirSync(folderBackup, { recursive: true });
      console.log(`Salvataggio file di backup in ${fs.realpathSync(folderBackup)}`)
      fs.writeFileSync(`${folderBackup}/${newCharacter.characterInfo.name}_${newDate.getTime()}.json`, JSON.stringify(newCharacter,null,2))

      res.status(201).json(newCharacter);
    } catch (error) {
      console.error("Error creating new character:", error);
      res
        .status(500)
        .json({ error: "Error creating new character" + error.message });
    }
  },

  updateCharacter: async (req, res) => {
    try {
      const { data } = req.body;
      
      if (!data._id) {
        return res.status(400).json({ error: "Missing or invalid character ID" });
      }
  
      // Cerca e aggiorna il personaggio direttamente
      const updatedCharacter = await Character.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true } // Restituisce il personaggio aggiornato invece di quello precedente
      );
  
      if (!updatedCharacter) {
        return res.status(404).json({ error: "Character not found" });
      }
  
      res.status(200).json({ message: "Character updated", character: updatedCharacter });
    } catch (error) {
      console.error("Error updating character:", error);
      res
        .status(500)
        .json({ error: "Error updating new character" + error.message });
    }
  },
};

module.exports = UserController;

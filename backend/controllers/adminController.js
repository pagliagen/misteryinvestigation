const User = require("../models/User"); 
const Character = require("../models/Character"); 

const AdminController = { 
  
  // Funzione di callback per ottenere tutti i personaggi
  getListUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({ error: "Users not found" });
      }

      res.status(200).json(users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      res
        .status(500)
        .json({ error: "Error fetching user " + error.message });
    }
  },

  getListCharacters: async (req, res) => {
    try {
      const characters = await Character.find();
      if (!characters) {
        return res.status(404).json({ error: "Characters not found" });
      }

      res.status(200).json(characters || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
      res
        .status(500)
        .json({ error: "Error fetching characters" + error.message });
    }
  },
};

module.exports = AdminController;

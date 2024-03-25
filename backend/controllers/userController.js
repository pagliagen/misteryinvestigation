const User = require("../models/User");
const Character = require("../models/Character");
const {
  sendPasswordResetEmail,
  welcomeEmail,
} = require("../services/emailService");
const { createJWTToken } = require("../services/jwtHelper");
const { default: slugify } = require("slugify");

const UserController = {
  // Funzione di callback per l'autenticazione
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Cerca l'utente nel database
      const user = await User.findOne({ username }).populate({
        path: "characters",
        options: { sort: { created: -1 } },
      });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Verifica la correttezza della password utilizzando il metodo del modello
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = createJWTToken(
        user.id,
        user.username,
        user.isMaster,
        user.isAdmin
      );

      // Invia il token come risposta
      res.status(200).json({ token });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error authenticating user: " + error.message });
    }
  }, 

  register: async (req, res) => {
    const { email, username, password, isMaster } = req.body;

    try {
      // Verifica se l'utente esiste già nel database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Crea un nuovo utente nel database utilizzando il modello User
      const newUser = new User({ email, username, password, isMaster });
      await newUser.save();

      await welcomeEmail(email, username, password, isMaster);

      // Invia una risposta di successo
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  },

  resetPassword: async (req, res) => {
    const { email } = req.body;

    try {
      // Cerca l'utente dal database per l'email fornita
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Utente non trovato" });
      }

      // Genera un token di reset della password e lo salva nell'utente
      user.generatePasswordResetToken();
      await user.save();

      // Invia un'email con le istruzioni per il reset della password
      await sendPasswordResetEmail(user.email, user.resetPasswordToken);

      res.status(200).json({
        message: "Email di reset della password inviata con successo",
      });
    } catch (error) {
      console.error("Errore durante il reset della password:", error);
      res.status(500).json({
        message: "Si è verificato un errore durante il reset della password",
      });
    }
  },

  updatePassword: async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      // Cerca l'utente dal database utilizzando il token di reset della password
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      // Se l'utente non è stato trovato, restituisci un errore
      if (!user) {
        return res
          .status(404)
          .json({ message: "Token di reset della password non valido" });
      }

      // Aggiorna la password dell'utente nel database
      user.password = newPassword;
      await user.save();

      // Rispondi con un messaggio di successo
      res.status(200).json({ message: "Password aggiornata con successo" });
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
      res.status(500).json({
        message:
          "Si è verificato un errore durante l'aggiornamento della password",
      });
    }
  },
};

module.exports = UserController;

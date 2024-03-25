const cron = require('node-cron');
const User = require('../models/User');

const resetExpiredTokens = async () => {
  try {
    // Trova tutti gli utenti con un token di reset della password scaduto
    const expiredUsers = await User.find({ resetPasswordExpires: { $lt: Date.now() } });

    // Reimposta il campo resetPasswordToken a undefined per gli utenti con token scaduti
    await Promise.all(expiredUsers.map(async (user) => {
      user.resetPasswordToken = user.username;
      await user.save();
    }));
  } catch (error) {
    console.error('Errore durante il reset dei token di reset della password:', error);
  }
};

// Esegui la funzione ogni minuto
cron.schedule('* * * * *', resetExpiredTokens);

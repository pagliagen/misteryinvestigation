// emailService.js

const nodemailer = require('nodemailer');
const { config } = require('../../config');

// Configurazione del trasportatore SMTP per l'invio di email 
const transporter = nodemailer.createTransport({
  host: 'mail.misteryinvestigation.it',
  port: 25,
  secure: false,
  auth: {
    user: config.email.username,
    pass: config.email.password,  
  } 
});

// Invia un'email di reset della password
exports.sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: config.email.username,
    to: email,
    subject: 'Reset della password',
    text: `Clicca su questo link per resettare la tua password: ${config.frontend.host}/reset-password/${token}`,
    html: `<p>Clicca su questo link per resettare la tua password: <a href="${config.frontend.host}/reset-password/${token}">Reset Password</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email di reset della password inviata con successo');
  } catch (error) {
    console.error(`Errore durante l'invio dell'email di reset della password: ${error}`)
  }
};

// Invia un'email di reset della password
exports.welcomeEmail = async (email, username, password, isMaster) => {
  const mailOptions = {
    from: config.email.username,
    to: email,
    subject: 'Iscrizione a Mistery Investigation',
    text: `Benvenuto ${username}`,
    html: `<p>Benvenuto ${username}</p>`
  };

  try {
    const response =await transporter.sendMail(mailOptions);
    console.log('Email di benvenuto inviata con successo',response);
  } catch (error) {
    console.error(`Errore durante l'invio dell'email di benvenuto: ${error}`)
  }
};

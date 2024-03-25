const mongoose = require('mongoose');
const { config } = require('../../config');

// Connessione al database MongoDB
mongoose.connect(`mongodb://localhost:27017/${config.db.name}`)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection; // Esporta l'oggetto di connessione


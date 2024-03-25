const express = require('express');
const router = express.Router(); 

// Rotte per l'autenticazione 
router.get('/error', (req, res) => {
    console.error('Test Error')
    res.status(500).json({ error: 'Test error' })
}); 
router.get('/check', (req, res) => {
    res.status(200).json({ status: 'OK' })
}); 

module.exports = router;

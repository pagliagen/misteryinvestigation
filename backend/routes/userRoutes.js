const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Rotte per l'autenticazione
router.post('/login', UserController.login);
router.post('/reset-password', UserController.resetPassword);
router.post('/update-password', UserController.updatePassword);
router.post('/register', UserController.register); 

module.exports = router;

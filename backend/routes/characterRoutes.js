const express = require('express');
const router = express.Router();
const CharacterController = require('../controllers/characterController');
const middleware = require('../controllers/middleware');

// Rotte per l'autenticazione
router.get('/list',  middleware.validateJWT, CharacterController.getUserCharacters); 
router.get('/:id', middleware.validateJWT, CharacterController.getCharacterById); 
router.get('/image/:id/:page', CharacterController.getImageById); 
router.post('/upload/avatar/:id', middleware.validateJWT, CharacterController.uploadAvatar); 
router.post('/create', middleware.validateJWT,CharacterController.createNewCharacter); 
router.post('/update', middleware.validateJWT,CharacterController.updateCharacter); 

module.exports = router;

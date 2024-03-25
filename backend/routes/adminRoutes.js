const express = require("express");
const router = express.Router();
const middleware = require("../controllers/middleware");
const adminController = require("../controllers/adminController");

// Rotte per l'autenticazione
router.get("/user/list", middleware.validateJWT, middleware.isAdmin, adminController.getListUsers);
router.get("/character/list", middleware.validateJWT, middleware.isAdmin, adminController.getListCharacters);

module.exports = router;

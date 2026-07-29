const express = require("express");
const router = express.Router();
const komikController = require("../controller/komikController");
const userController = require("../controller/userController");
const genreController = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");

// Public User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Public Komik Routes
router.get("/komik", komikController.getAllKomik);
router.get("/komik/:id", komikController.getKomikById);

// Protected Komik Routes
router.post("/komik", authMiddleware, komikController.createKomik);
router.put("/komik/:id", authMiddleware, komikController.updateKomik);
router.delete("/komik/:id", authMiddleware, komikController.deleteKomik);

// Public Genre Routes
router.get("/genre", genreController.getAllGenre);
router.get("/genre/:id", genreController.getGenreById);

// Protected Genre Routes (Harus Login)
router.post("/genre", authMiddleware, genreController.createGenre);
router.put("/genre/:id", authMiddleware, genreController.updateGenre);
router.delete("/genre/:id", authMiddleware, genreController.deleteGenre);

module.exports = router;
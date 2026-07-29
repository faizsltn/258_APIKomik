const db = require("../models");

// GET /api/genre (Public)
async function getAllGenre(req, res) {
  try {
    const genre = await db.Genre.findAll();
    res.status(200).json(genre);
  } catch (err) {
    console.error("Error fetching Genre:", err.message);
    res.status(500).json({ error: "Failed to fetch Genre" });
  }
}

// GET /api/genre/:id (Public)
async function getGenreById(req, res) {
  const { id } = req.params;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.status(200).json(genre);
  } catch (err) {
    console.error("Error fetching Genre:", err.message);
    res.status(500).json({ error: "Failed to fetch Genre" });
  }
}

// POST /api/genre (Protected - Butuh Login)
async function createGenre(req, res) {
  const { nama_genre } = req.body;
  try {
    if (!nama_genre) {
      return res.status(400).json({ message: "nama_genre wajib diisi" });
    }
    const newGenre = await db.Genre.create({ nama_genre });
    res.status(201).json(newGenre);
  } catch (err) {
    console.error("Error creating Genre:", err.message);
    res.status(500).json({ error: "Failed to create Genre" });
  }
}

// PUT /api/genre/:id (Protected - Butuh Login)
async function updateGenre(req, res) {
  const { id } = req.params;
  const { nama_genre } = req.body;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    genre.nama_genre = nama_genre || genre.nama_genre;
    await genre.save();
    res.status(200).json(genre);
  } catch (err) {
    console.error("Error updating Genre:", err.message);
    res.status(500).json({ error: "Failed to update Genre" });
  }
}

// DELETE /api/genre/:id (Protected - Butuh Login)
async function deleteGenre(req, res) {
  const { id } = req.params;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    await genre.destroy();
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (err) {
    console.error("Error deleting Genre:", err.message);
    res.status(500).json({ error: "Failed to delete Genre" });
  }
}

module.exports = {
  getAllGenre,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};
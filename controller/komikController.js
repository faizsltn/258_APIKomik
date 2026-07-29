const db = require("../models");

async function getAllKomik(req, res) {
  try {
    const komik = await db.Komik.findAll();
    res.status(200).json(komik);
  } catch (err) {
    console.error("Error fetching Komik:", err.message);
    res.status(500).json({ error: "Failed to fetch Book" });
  }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
      const komik = await db.Komik.findByPk(id);
      if (!komik) {
        return res.status(404).json({ error: "Komik not found" });
      }
      res.status(200).json(komik);
    } catch (err) {
      console.error("Error fetching Komik:", err.message);
      res.status(500).json({ error: "Failed to fetch Komik" });
    }
}
async function createKomik(req, res) {
    const { title, description, author } = req.body;
    try {
      const newKomik = await db.Komik.create({ title, description, author });
      res.status(201).json(newKomik);
    } catch (err) {
      console.error("Error creating Komik:", err.message);
      res.status(500).json({ error: "Failed to create Komik" });
    }
}
  
async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
      const komik = await db.Komik.findByPk(id);
      if (!komik) {
        return res.status(404).json({ error: "Komik not found" });
      }
      komik.title = title;
      komik.description = description;
      komik.author = author;
      await komik.save();
      res.status(200).json(komik);
    } catch (err) {
      console.error("Error updating Komik:", err.message);
      res.status(500).json({ error: "Failed to update Komik" });
    }
}
  
async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
      const komik = await db.Komik.findByPk(id);
      if (!komik) {
        return res.status(404).json({ error: "Komik not found" });
      }
      await komik.destroy();
      res.status(200).json({ message: "Komik deleted successfully" });
    } catch (err) {
      console.error("Error deleting Komik:", err.message);
      res.status(500).json({ error: "Failed to delete Komik" });
    }
}
  
module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};

const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Register berhasil",
      data: { id: newUser.id, email: newUser.email }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "mySuperSecretKey123",
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    return res.status(200).json({
      message: "Login berhasil",
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login
};
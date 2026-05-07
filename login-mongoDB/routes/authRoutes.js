const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTRO
router.post("/register", async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const userExists = await User.findOne({
      email
    });

    if (userExists) {

      return res.status(400).json({
        message: "Usuario ya existe"
      });

    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "Usuario no encontrado"
      });

    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {

      return res.status(400).json({
        message: "Contraseña incorrecta"
      });

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;
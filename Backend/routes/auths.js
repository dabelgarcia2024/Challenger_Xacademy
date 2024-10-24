const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/login', [
  body('username').notEmpty(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  const user = { username: 'admin', password: 'admin' }; // Usuario ficticio

  if (username !== user.username) return res.status(400).json({ msg: 'Usuario no encontrado' });

  if (password !== user.password) return res.status(400).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;

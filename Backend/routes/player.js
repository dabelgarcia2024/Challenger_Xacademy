const express = require('express');
const { getPlayers, getPlayerById, createPlayer, updatePlayer } = require('../controllers/playerController');
const { body } = require('express-validator');
const router = express.Router();

// Middleware para proteger las rutas
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener lista de jugadores (paginado y filtrado)
router.get('/', authMiddleware, getPlayers);

// Obtener un jugador por ID
router.get('/:id', authMiddleware, getPlayerById);

// Crear un jugador nuevo
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('position').notEmpty(),
    body('club').notEmpty(),
    body('rating').isFloat({ min: 0, max: 100 }),
  ],
  authMiddleware,
  createPlayer
);

// Editar un jugador
router.put('/:id', authMiddleware, updatePlayer);

module.exports = router;

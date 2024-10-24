const { Player, Skill } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los jugadores (paginado y filtrado)
const getPlayers = async (req, res) => {
  const { name, club, position, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const players = await Player.findAndCountAll({
      where: {
        name: { [Op.like]: `%${name || ''}%` },
        club: { [Op.like]: `%${club || ''}%` },
        position: { [Op.like]: `%${position || ''}%` },
      },
      include: [{ model: Skill, as: 'skills' }],
      limit,
      offset,
    });
    res.json({
      data: players.rows,
      total: players.count,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
};

// Obtener un jugador por ID
const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findByPk(id, {
      include: [{ model: Skill, as: 'skills' }]
    });
    if (!player) return res.status(404).json({ error: 'Jugador no encontrado' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el jugador' });
  }
};

// Crear un nuevo jugador
const createPlayer = async (req, res) => {
  const { name, position, club, nationality, rating, version, skills } = req.body;

  try {
    const newPlayer = await Player.create({ name, position, club, nationality, rating, version });
    
    // Crear habilidades asociadas al jugador
    if (skills && skills.length > 0) {
      const playerSkills = skills.map(skill => ({
        ...skill,
        playerId: newPlayer.id,
      }));
      await Skill.bulkCreate(playerSkills);
    }

    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jugador' });
  }
};

// Actualizar un jugador existente
const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, position, club, nationality, rating, version, skills } = req.body;

  try {
    const player = await Player.findByPk(id);
    if (!player) return res.status(404).json({ error: 'Jugador no encontrado' });

    await player.update({ name, position, club, nationality, rating, version });

    // Actualizar habilidades si son proporcionadas
    if (skills && skills.length > 0) {
      await Skill.destroy({ where: { playerId: id } });
      const updatedSkills = skills.map(skill => ({
        ...skill,
        playerId: id,
      }));
      await Skill.bulkCreate(updatedSkills);
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el jugador' });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
};

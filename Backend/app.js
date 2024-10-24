const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const playerRoutes = require('./routes/player');
const authRoutes = require('./Backend/routes/auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/players', playerRoutes);
app.use('/api/auth', authRoutes);

// Sincronizar con la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
});

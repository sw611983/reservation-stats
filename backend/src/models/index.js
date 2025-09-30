const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const storage = process.env.DB_PATH || './sqlite.db';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Reservation = require('./reservation')(sequelize, DataTypes);

Restaurant.hasMany(Reservation, { foreignKey: 'restaurant_id' });
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

module.exports = { sequelize, Restaurant, Reservation };

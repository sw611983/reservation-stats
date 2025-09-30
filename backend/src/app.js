require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const restaurantsRouter = require('./routes/restaurants');
const statsRouter = require('./routes/stats');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/restaurants', restaurantsRouter);
app.use('/api/stats', statsRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connected to SQLite DB.');
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();

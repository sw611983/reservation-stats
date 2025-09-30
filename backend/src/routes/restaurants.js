const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await Restaurant.findAll({ attributes: ['id', 'name'] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

router.get('/', async (req, res) => {
  try {
    const restaurantId = parseInt(req.query.restaurantId, 10);
    if (!restaurantId) return res.status(400).json({ error: 'restaurantId (numeric) is required.' });

    let from = req.query.from;
    let to = req.query.to;

    const todayIso = new Date().toISOString().slice(0, 10);
    if (!to) to = todayIso;
    if (!from) {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      from = d.toISOString().slice(0, 10);
    }

    const rows = await sequelize.query(
      `SELECT CAST(strftime('%w', reservation_date) AS INTEGER) AS weekday_num,
              group_size,
              COUNT(*) AS cnt
       FROM reservations
       WHERE restaurant_id = :restaurantId
         AND reservation_date BETWEEN :from AND :to
       GROUP BY weekday_num, group_size
       ORDER BY weekday_num, group_size;`,
      {
        replacements: { restaurantId, from, to },
        type: QueryTypes.SELECT
      }
    );

    const weekdayGroupCounts = {};
    for (let i = 0; i < 7; i++) weekdayGroupCounts[weekdayNames[i]] = { total: 0, groups: {} };

    const groupSizesSet = new Set();
    for (const r of rows) {
      const name = weekdayNames[r.weekday_num];
      const gs = String(r.group_size);
      weekdayGroupCounts[name].groups[gs] = (weekdayGroupCounts[name].groups[gs] || 0) + r.cnt;
      weekdayGroupCounts[name].total += r.cnt;
      groupSizesSet.add(r.group_size);
    }

    const bucketFor = (size) => {
      if (size <= 2) return '1-2';
      if (size <= 4) return '3-4';
      if (size <= 6) return '5-6';
      return '7+';
    };
    const buckets = ['1-2', '3-4', '5-6', '7+'];
    const weekdayBucketCounts = {};
    for (let i = 0; i < 7; i++) {
      weekdayBucketCounts[weekdayNames[i]] = {};
      for (const b of buckets) weekdayBucketCounts[weekdayNames[i]][b] = 0;
    }
    for (const r of rows) {
      const name = weekdayNames[r.weekday_num];
      const b = bucketFor(r.group_size);
      weekdayBucketCounts[name][b] += r.cnt;
    }

    res.json({
      restaurantId,
      from,
      to,
      weekdayGroupCounts,
      weekdayBucketCounts,
      groupSizes: Array.from(groupSizesSet).sort((a,b)=>a-b),
      buckets
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

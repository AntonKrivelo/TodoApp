const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at DESC',
    [req.user.id],
  );
  res.json(rows);
});

router.post('/', authMiddleware, async (req, res) => {
  const { body } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tasks (user_id, body) VALUES ($1, $2) RETURNING *',
    [req.user.id, body],
  );
  res.json(rows[0]);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
  res.json({ success: true });
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hash],
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(400).json({ message: 'User exists or DB error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

module.exports = router;

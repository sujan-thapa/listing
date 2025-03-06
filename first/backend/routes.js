// for api routes

const express = require('express');
const pool = require('./db');
const router = express.Router();

// Example route: Fetch data from the database
router.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


  router.post('/users', async (req, res) => {
    const { username, email, password_hash } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password_hash]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const result = await pool.query(
        'UPDATE users SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [username, email, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
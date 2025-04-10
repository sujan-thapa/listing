import express from 'express';
import pool from './db.js';

const app = express.Router();

// API endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


export default app;
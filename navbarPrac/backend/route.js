import express from 'express';
import pool from './db.js';


const app = express.Router()


// for fetching data
app.get('/tasks', async (req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.status(201).json(result.rows)
    } catch (error) {
        console.log(error)
    }
})

export default app
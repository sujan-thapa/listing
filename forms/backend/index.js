import express from 'express';

import pool from './db.js';
import cors from 'cors'
import routes from './route.js'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the root directory
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()

const port = process.env.PORT || 3000;


// middleware to parse JSON
app.use(express.json());
app.use(cors());

// routes
app.use("/api", routes);

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
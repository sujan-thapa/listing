import express from 'express';
import pool from "./db.js";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './route.js'
import cors from 'cors'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the root directory
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()

const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Routes
app.use("/api", routes);


app.listen(port, ()=>{
    console.log(`Server running at  http://localhost:${port}`)
})
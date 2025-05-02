// db.js
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from "url";

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({path: path.resolve(__dirname, '../.env')});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// // Test connection (optional)
// async function testConnection() {
//     let client;
//     try {
//         client = await pool.connect();
//         console.log("Database connection successful");
//         const res = await client.query('SELECT NOW()');
//         console.log('Database time:', res.rows[0].now);
//     } catch (err) {
//         console.error("Database connection failed", err.stack);
//     } finally {
//         if (client) client.release();
//     }
// }

// testConnection();

export default pool;
import { Pool } from "pg";

const isLocalDb = /localhost|127\.0\.0\.1/.test(process.env.DB_URL || "");

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: isLocalDb ? false : { rejectUnauthorized: false }
});

export default pool;
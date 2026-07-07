import db from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupDatabase = async() => {
    const schemaPath = join(__dirname, 'sql', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    await db.query(schemaSQL);
    console.log('Database schema ready');
};

const testConnection = async () => {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('Database connection succesful:',
        result.rows[0].current_time
    );
};

export { setupDatabase, testConnection };
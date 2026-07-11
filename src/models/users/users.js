import bcrypt from 'bcrypt';
import db from '../db.js';

const emailExists = async (email) => {
    const result = await db.query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists', [email]);
    return result.rows[0].exists;
};

const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await db.query(
        `SELECT id, name, email, password, role, created_at FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`, 
        [email]
    );
    return result.rows[0] || null;
};

const verifyPassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const getAllUsers = async() => {
    const result = await db.query(`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`);
    return result.rows;
};

const updateUserRole = async (id, role) => {
    const result = await db.query(
        `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role`,
        [role, id]
    );
    return result.rows[0] || null;
};

export { emailExists, createUser, findUserByEmail, verifyPassword, getAllUsers, updateUserRole };
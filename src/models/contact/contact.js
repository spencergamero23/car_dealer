import db from '../db.js';

const createContactSubmission = async ({ name, email, phone, message}) => {
    const query = `
    INSERT INTO contact_submissions (name, email, phone, message)
    VALUES($1, $2, $3, $4)
    RETURNING id
    `;
    const result = await db.query(query, [name, email, phone, message]);
    return result.rows[0];
};

const getAllContactSubmissions = async () => {
    const result = await db.query(
        `SELECT id, name, email, phone, message, created_at FROM contact_submissions ORDER BY created_at DESC`
    );
    return result.rows;
};
export { createContactSubmission, getAllContactSubmissions };
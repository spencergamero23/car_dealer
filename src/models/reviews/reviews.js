import db from '../db.js';

const createReview = async (userId, vehicleSlug, rating, comment) => {
    const result = await db.query(
        `INSERT INTO reviews (user_id, vehicle_slug, rating, comment)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [userId, vehicleSlug, rating, comment]
    );
    return result.rows[0];
};

const getReviewsByVehicleSlug = async (vehicleSlug) => {
    const result = await db.query(
        `SELECT reviews.id, reviews.rating, reviews.comment, reviews.created_at,
                reviews.user_id, users.name AS "userName"
         FROM reviews
         JOIN users ON reviews.user_id = users.id
         WHERE reviews.vehicle_slug = $1
         ORDER BY reviews.created_at DESC`,
        [vehicleSlug]
    );
    return result.rows;
};

const getReviewById = async (id) => {
    const result = await db.query(`SELECT * FROM reviews WHERE id = $1`, [id]);
    return result.rows[0] || null;
};

const updateReview = async (id, rating, comment) => {
    const result = await db.query(
        `UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING id`,
        [rating, comment, id]
    );
    return result.rows[0] || null;
};

const deleteReview = async (id) => {
    const result = await db.query(`DELETE FROM reviews WHERE id = $1`, [id]);
    return result.rowCount > 0;
};

export { createReview, getReviewsByVehicleSlug, getReviewById, updateReview, deleteReview };
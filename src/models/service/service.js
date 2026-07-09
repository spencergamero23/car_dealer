import db from '../db.js';

const createServiceRequest = async (userId, vehicleInfo, serviceType, notes) => {
    const result = await db.query(
        `INSERT INTO service_requests (user_id, vehicle_info, service_type, notes)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [userId, vehicleInfo, serviceType, notes]
    );
    return result.rows[0];
};

const getServiceRequestsByUser = async (userId) => {
    const result = await db.query(
        `SELECT id, vehicle_info, service_type, notes, status, created_at
         FROM service_requests
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};

export { createServiceRequest, getServiceRequestsByUser };
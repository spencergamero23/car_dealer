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

const getAllServiceRequests = async () => {
    const result = await db.query(
        `SELECT service_requests.id, service_requests.vehicle_info, service_requests.service_type,
                service_requests.notes, service_requests.employee_notes, service_requests.status,
                service_requests.created_at, users.name AS "customerName"
         FROM service_requests
         JOIN users ON service_requests.user_id = users.id
         ORDER BY service_requests.created_at DESC`
    );
    return result.rows;
};

const updateServiceRequestStatus = async (id, status, employeeNotes) => {
    const result = await db.query(
        `UPDATE service_requests SET status = $1, employee_notes = $2 WHERE id = $3 RETURNING id`,
        [status, employeeNotes, id]
    );
    return result.rows[0] || null;
};

export { createServiceRequest, getServiceRequestsByUser, getAllServiceRequests, updateServiceRequestStatus };
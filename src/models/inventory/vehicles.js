import db from '../db.js';

const mapVehicle = (row) => ({
    slug: row.slug,
    category: row.category_name,
    make: row.make,
    model: row.model,
    year: row.year,
    price: Number(row.price),
    mileage: row.mileage,
    image: row.image,
    description: row.description,
    available: row.available,
    specs: {
        engine: row.engine,
        transmission: row.transmission,
        drivetrain: row.drivetrain
    }
});

const getAllVehicles = async (category) => {
    const query = category
        ? `SELECT vehicles.*, categories.name AS category_name
           FROM vehicles JOIN categories ON vehicles.category_id = categories.id
           WHERE LOWER(categories.name) = LOWER($1)
           ORDER BY vehicles.year DESC`
        : `SELECT vehicles.*, categories.name AS category_name
           FROM vehicles JOIN categories ON vehicles.category_id = categories.id
           ORDER BY vehicles.year DESC`;

    const result = category ? await db.query(query, [category]) : await db.query(query);
    return result.rows.map(mapVehicle);
};

const getVehicleBySlug = async (slug) => {
    const result = await db.query(
        `SELECT vehicles.*, categories.name AS category_name
         FROM vehicles JOIN categories ON vehicles.category_id = categories.id
         WHERE vehicles.slug = $1`,
        [slug]
    );
    return result.rows[0] ? mapVehicle(result.rows[0]) : null;
};

const updateVehicle = async (slug, { price, description, available }) => {
    const result = await db.query(
        `UPDATE vehicles SET price = $1, description = $2, available = $3 WHERE slug = $4 RETURNING slug`,
        [price, description, available, slug]
    );
    return result.rows[0] || null;
};

const createVehicle = async ({ slug, categoryName, make, model, year, price, mileage, image, description, engine, transmission, drivetrain }) => {
    const result = await db.query(
        `INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
         SELECT $1, categories.id, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
         FROM categories WHERE categories.name = $12
         RETURNING slug`,
        [slug, make, model, year, price, mileage, image, description, engine, transmission, drivetrain, categoryName]
    );
    return result.rows[0] || null;
};

const deleteVehicle = async (slug) => {
    const result = await db.query(`DELETE FROM vehicles WHERE slug = $1`, [slug]);
    return result.rowCount > 0;
};

export { getAllVehicles, getVehicleBySlug, updateVehicle, createVehicle, deleteVehicle };
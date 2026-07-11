CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_slug VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_info VARCHAR(255) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer';

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    mileage INTEGER NOT NULL,
    image VARCHAR(255),
    description TEXT,
    engine VARCHAR(100),
    transmission VARCHAR(50),
    drivetrain VARCHAR(50),
    available BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO categories (name) VALUES
    ('Cars'), ('Trucks'), ('Vans'), ('SUVs')
ON CONFLICT (name) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'toyota-camry-2022', id, 'Toyota', 'Camry', 2022, 24000, 15000, '/images/inventory/toyota-camry-2022.jpg', 'A reliable, fuel-efficient sedan with a comfortable ride.', '2.5L 4-Cylinder', 'Automatic', 'FWD'
FROM categories WHERE name = 'Cars'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'ford-f150-2021', id, 'Ford', 'F-150', 2021, 35000, 22000, '/images/inventory/ford-f150-2021.jpg', 'A powerful full-size truck built for work and towing.', '3.5L V6 EcoBoost', 'Automatic', '4WD'
FROM categories WHERE name = 'Trucks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'honda-odyssey-2020', id, 'Honda', 'Odyssey', 2020, 28000, 31000, '/images/inventory/honda-odyssey-2020.jpg', 'Spacious minivan with seating for the whole family.', '3.5L V6', 'Automatic', 'FWD'
FROM categories WHERE name = 'Vans'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'jeep-grand-cherokee-2023', id, 'Jeep', 'Grand Cherokee', 2023, 39000, 8000, '/images/inventory/jeep-grand-cherokee-2023.jpg', 'Rugged and capable SUV with room for the whole crew.', '3.6L V6', 'Automatic', '4WD'
FROM categories WHERE name = 'SUVs'
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE service_requests ALTER COLUMN status SET DEFAULT 'Submitted';
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS employee_notes TEXT;
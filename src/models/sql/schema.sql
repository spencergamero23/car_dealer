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

CREATE TABLE IF NOT EXISTS vehicle_images (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_reviews_vehicle'
    ) THEN
        ALTER TABLE reviews ADD CONSTRAINT fk_reviews_vehicle FOREIGN KEY (vehicle_slug) REFERENCES vehicles(slug) ON DELETE CASCADE;
    END IF;
END $$;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'chevrolet-silverado-2020', id, 'Chevrolet', 'Silverado 1500', 2020, 32000, 28000, 'https://picsum.photos/seed/chevrolet-silverado-2020/600/400', 'A dependable full-size truck with strong towing capacity.', '5.3L V8', 'Automatic', '4WD'
FROM categories WHERE name = 'Trucks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'ram-1500-2022', id, 'Ram', '1500', 2022, 41000, 12000, 'https://picsum.photos/seed/ram-1500-2022/600/400', 'A comfortable, powerful truck with a smooth ride.', '3.6L V6', 'Automatic', '4WD'
FROM categories WHERE name = 'Trucks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'chrysler-pacifica-2021', id, 'Chrysler', 'Pacifica', 2021, 30000, 25000, 'https://picsum.photos/seed/chrysler-pacifica-2021/600/400', 'A feature-packed minivan with plenty of family-friendly tech.', '3.6L V6', 'Automatic', 'FWD'
FROM categories WHERE name = 'Vans'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'toyota-sienna-2023', id, 'Toyota', 'Sienna', 2023, 36000, 9000, 'https://picsum.photos/seed/toyota-sienna-2023/600/400', 'A fuel-efficient hybrid minivan with standard all-wheel drive.', '2.5L Hybrid', 'Automatic (CVT)', 'AWD'
FROM categories WHERE name = 'Vans'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'honda-accord-2021', id, 'Honda', 'Accord', 2021, 25000, 18000, 'https://picsum.photos/seed/honda-accord-2021/600/400', 'A sporty, efficient midsize sedan with a comfortable interior.', '1.5L Turbo 4-Cylinder', 'Automatic (CVT)', 'FWD'
FROM categories WHERE name = 'Cars'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'mazda3-2023', id, 'Mazda', 'Mazda3', 2023, 23000, 6000, 'https://picsum.photos/seed/mazda3-2023/600/400', 'A stylish compact car with an upscale interior and fun handling.', '2.5L 4-Cylinder', 'Automatic', 'FWD'
FROM categories WHERE name = 'Cars'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'toyota-rav4-2022', id, 'Toyota', 'RAV4', 2022, 29000, 16000, 'https://picsum.photos/seed/toyota-rav4-2022/600/400', 'A practical, reliable compact SUV with great fuel economy.', '2.5L 4-Cylinder', 'Automatic', 'AWD'
FROM categories WHERE name = 'SUVs'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicles (slug, category_id, make, model, year, price, mileage, image, description, engine, transmission, drivetrain)
SELECT 'ford-explorer-2020', id, 'Ford', 'Explorer', 2020, 31000, 27000, 'https://picsum.photos/seed/ford-explorer-2020/600/400', 'A spacious three-row SUV with a comfortable ride and strong towing.', '3.3L V6 Hybrid', 'Automatic', '4WD'
FROM categories WHERE name = 'SUVs'
ON CONFLICT (slug) DO NOTHING;

UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3225/' WHERE slug = 'toyota-sienna-2023';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2891/' WHERE slug = 'mazda3-2023';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3250/' WHERE slug = 'jeep-grand-cherokee-2023';
UPDATE vehicles SET image = 'https://hips.hearstapps.com/hmg-prod/images/2022-ram-1500-backcountry-special-edition-104-1625851347.jpg?crop=0.986xw:1.00xh;0.0128xw,0&resize=1200:*' WHERE slug = 'ram-1500-2022';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3164/' WHERE slug = 'toyota-rav4-2022';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3138/' WHERE slug = 'toyota-camry-2022';
UPDATE vehicles SET image = 'https://hips.hearstapps.com/hmg-prod/images/2021-honda-accord-hybrid-109-edit-1604961241.jpg?crop=0.591xw:0.499xh;0.0962xw,0.501xh&resize=2048:*' WHERE slug = 'honda-accord-2021';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3116/' WHERE slug = 'ford-f150-2021';
UPDATE vehicles SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5nMbpfyO-YBvxKpB57m8yewqj4ZWZX6DGvuO6yL3zg&s=10' WHERE slug = 'chrysler-pacifica-2021';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2973/' WHERE slug = 'ford-explorer-2020';
UPDATE vehicles SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs0LFTG-lthss-QnQKuXbD6H2LGJQgg37zMbZfguVEdQ&s=10' WHERE slug = 'chevrolet-silverado-2020';
UPDATE vehicles SET image = 'https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2732/' WHERE slug = 'honda-odyssey-2020';
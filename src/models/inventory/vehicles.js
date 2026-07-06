// Temporary in-memory data. Swap this for real PostgreSQL queries later —
// keep these two function signatures the same so the controller doesn't change.
const vehicles = [
    {
        slug: 'toyota-camry-2022',
        category: 'Cars',
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        price: 24000,
        mileage: 15000,
        image: '/images/inventory/toyota-camry-2022.jpg',
        description: 'A reliable, fuel-efficient sedan with a comfortable ride.',
        specs: { engine: '2.5L 4-Cylinder', transmission: 'Automatic', drivetrain: 'FWD' }
    },
    {
        slug: 'ford-f150-2021',
        category: 'Trucks',
        make: 'Ford',
        model: 'F-150',
        year: 2021,
        price: 35000,
        mileage: 22000,
        image: '/images/inventory/ford-f150-2021.jpg',
        description: 'A powerful full-size truck built for work and towing.',
        specs: { engine: '3.5L V6 EcoBoost', transmission: 'Automatic', drivetrain: '4WD' }
    },
    {
        slug: 'honda-odyssey-2020',
        category: 'Vans',
        make: 'Honda',
        model: 'Odyssey',
        year: 2020,
        price: 28000,
        mileage: 31000,
        image: '/images/inventory/honda-odyssey-2020.jpg',
        description: 'Spacious minivan with seating for the whole family.',
        specs: { engine: '3.5L V6', transmission: 'Automatic', drivetrain: 'FWD' }
    },
    {
        slug: 'jeep-grand-cherokee-2023',
        category: 'SUVs',
        make: 'Jeep',
        model: 'Grand Cherokee',
        year: 2023,
        price: 39000,
        mileage: 8000,
        image: '/images/inventory/jeep-grand-cherokee-2023.jpg',
        description: 'Rugged and capable SUV with room for the whole crew.',
        specs: { engine: '3.6L V6', transmission: 'Automatic', drivetrain: '4WD' }
    }
];

const getAllVehicles = async(category) => {
    if (!category) return vehicles;
    return vehicles.filter(v => v.category.toLowerCase() === category.toLowerCase());
};

const getVehicleBySlug = async (slug) => {
    return vehicles.find(v => v.slug === slug) || null;
};

export { getAllVehicles, getVehicleBySlug};
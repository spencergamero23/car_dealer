import { getAllVehicles, getVehicleBySlug} from '../../models/inventory/vehicles.js';
import { getReviewsByVehicleSlug } from '../../models/reviews/reviews.js';

const inventoryListPage = async (req, res) => {
    const category = req.query.category;
    const vehicles = await getAllVehicles(category);

    res.render('inventory/list',{
        title: 'Inventory',
        vehicles,
        category: category || 'All'
    });
};

const vehicleDetailPage = async (req,res, next) => {
    const vehicle = await getVehicleBySlug(req.params.slug);

    if(!vehicle) {
        const err = new Error(`Vehicle ${req.params.slug} not found`);
        err.status = 404;
        return next(err);
    }

    const reviews = await getReviewsByVehicleSlug(vehicle.slug);

    res.render('inventory/detail', {
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        vehicle,
        reviews,
        currentUserId: req.session.user ? req.session.user.id : null
    });
};

export { inventoryListPage, vehicleDetailPage };
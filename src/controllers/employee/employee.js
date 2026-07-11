import { getAllVehicles, getVehicleBySlug, updateVehicle, addVehicleImage, deleteVehicleImage } from '../../models/inventory/vehicles.js';
import { getAllReviews, deleteReview } from '../../models/reviews/reviews.js';
import { getAllServiceRequests, updateServiceRequestStatus } from '../../models/service/service.js';
import { getAllContactSubmissions } from '../../models/contact/contact.js';

const showEmployeeDashboard = (req, res) => {
    res.render('employee/dashboard', { title: 'Employee Dashboard' });
};

const showVehicleList = async (req, res) => {
    const vehicles = await getAllVehicles();
    res.render('employee/vehicles', { title: 'Manage Vehicles', vehicles });
};

const showEditVehicleForm = async (req, res) => {
    const vehicle = await getVehicleBySlug(req.params.slug);

    if (!vehicle) {
        return res.redirect('/employee/vehicles');
    }

    res.render('employee/vehicle-edit', { title: 'Edit Vehicle', vehicle });
};

const processEditVehicle = async (req, res) => {
    const { price, description, available } = req.body;

    await updateVehicle(req.params.slug, {
        price,
        description,
        available: available === 'on'
    });

    res.redirect('/employee/vehicles');
};

const showReviewModeration = async (req, res) => {
    const reviews = await getAllReviews();
    res.render('employee/reviews', { title: 'Moderate Reviews', reviews });
};

const moderateDeleteReview = async (req, res) => {
    await deleteReview(req.params.id);
    res.redirect('/employee/reviews');
};

const showServiceRequests = async (req, res) => {
    const requests = await getAllServiceRequests();
    res.render('employee/service-requests', { title: 'Service Requests', requests });
};

const processUpdateServiceRequest = async (req, res) => {
    const { status, employeeNotes } = req.body;
    await updateServiceRequestStatus(req.params.id, status, employeeNotes);
    res.redirect('/employee/service-requests');
};

const showContactSubmissions = async (req, res) => {
    const submissions = await getAllContactSubmissions();
    res.render('employee/contact-submissions', { title: 'Contact Submissions', submissions });
};

const processAddVehicleImage = async (req, res) => {
    const vehicle = await getVehicleBySlug(req.params.slug);

    if (!vehicle) {
        return res.redirect('/employee/vehicles');
    }

    await addVehicleImage(vehicle.id, req.body.imageUrl);

    res.redirect(`/employee/vehicles/${req.params.slug}/edit`);
};

const processDeleteVehicleImage = async (req, res) => {
    await deleteVehicleImage(req.params.imageId);
    res.redirect(`/employee/vehicles/${req.params.slug}/edit`);
};

export {
    showEmployeeDashboard,
    showVehicleList, showEditVehicleForm, processEditVehicle,
    showReviewModeration, moderateDeleteReview,
    showServiceRequests, processUpdateServiceRequest,
    showContactSubmissions, processAddVehicleImage, processDeleteVehicleImage
};
import { Router } from 'express';
import { inventoryListPage, vehicleDetailPage } from './inventory/inventory.js';
import { contactFormPage, submitContactForm } from './contact/contact.js';
import {
    registrationValidation, loginValidation,
    showRegistrationForm, processRegistration,
    showLoginForm, processLogin, processLogout
} from './auth/auth.js';
import { submitReview, showEditReviewForm, processEditReview, processDeleteReview } from './reviews/reviews.js';
import { showServiceRequestForm, submitServiceRequest, showServiceRequestHistory } from './service/service.js';
import { requireLogin } from '../middleware/auth.js';
import {
    showEmployeeDashboard,
    showVehicleList, showEditVehicleForm, processEditVehicle,
    showReviewModeration, moderateDeleteReview,
    showServiceRequests, processUpdateServiceRequest,
    showContactSubmissions
} from './employee/employee.js';
import { requireRole } from '../middleware/auth.js';
import {
    showOwnerDashboard,
    showAddVehicleForm, processAddVehicle, processDeleteVehicle,
    showCategoryList, processAddCategory, processEditCategory, processDeleteCategory,
    showAllUsersPage, processUpdateUserRole
} from './owner/owner.js';

const router = Router();

router.get('/', inventoryListPage);
router.get('/inventory/:slug', vehicleDetailPage);
router.get('/contact', contactFormPage);
router.post('/contact', submitContactForm);

router.get('/register', showRegistrationForm);
router.post('/register', registrationValidation, processRegistration);
router.get('/login', showLoginForm);
router.post('/login', loginValidation, processLogin);
router.get('/logout', processLogout);

router.post('/inventory/:slug/reviews', requireLogin, submitReview);
router.get('/reviews/:id/edit', requireLogin, showEditReviewForm);
router.post('/reviews/:id/edit', requireLogin, processEditReview);
router.post('/reviews/:id/delete', requireLogin, processDeleteReview);

router.get('/service-requests', requireLogin, showServiceRequestHistory);
router.get('/service-requests/new', requireLogin, showServiceRequestForm);
router.post('/service-requests', requireLogin, submitServiceRequest);

router.get('/employee', requireRole('employee', 'owner'), showEmployeeDashboard);
router.get('/employee/vehicles', requireRole('employee', 'owner'), showVehicleList);
router.get('/employee/vehicles/:slug/edit', requireRole('employee', 'owner'), showEditVehicleForm);
router.post('/employee/vehicles/:slug/edit', requireRole('employee', 'owner'), processEditVehicle);
router.get('/employee/reviews', requireRole('employee', 'owner'), showReviewModeration);
router.post('/employee/reviews/:id/delete', requireRole('employee', 'owner'), moderateDeleteReview);
router.get('/employee/service-requests', requireRole('employee', 'owner'), showServiceRequests);
router.post('/employee/service-requests/:id', requireRole('employee', 'owner'), processUpdateServiceRequest);
router.get('/employee/contact-submissions', requireRole('employee', 'owner'), showContactSubmissions);

router.get('/owner', requireRole('owner'), showOwnerDashboard);
router.get('/owner/vehicles/new', requireRole('owner'), showAddVehicleForm);
router.post('/owner/vehicles', requireRole('owner'), processAddVehicle);
router.post('/owner/vehicles/:slug/delete', requireRole('owner'), processDeleteVehicle);
router.get('/owner/categories', requireRole('owner'), showCategoryList);
router.post('/owner/categories', requireRole('owner'), processAddCategory);
router.post('/owner/categories/:id/edit', requireRole('owner'), processEditCategory);
router.post('/owner/categories/:id/delete', requireRole('owner'), processDeleteCategory);
router.get('/owner/users', requireRole('owner'), showAllUsersPage);
router.post('/owner/users/:id/role', requireRole('owner'), processUpdateUserRole);

export default router;
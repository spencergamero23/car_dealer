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

export default router;
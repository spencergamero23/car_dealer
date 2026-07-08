import { Router } from 'express';
import { inventoryListPage, vehicleDetailPage } from './inventory/inventory.js';
import { contactFormPage, submitContactForm } from './contact/contact.js';
import { registrationValidation, loginValidation, showRegistrationForm, processRegistration, showLoginForm, processLogin, processLogout } from './auth/auth.js';

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

export default router;
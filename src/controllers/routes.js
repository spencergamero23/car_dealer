import { Router } from 'express';
import { inventoryListPage, vehicleDetailPage } from './inventory/inventory.js';
import { contactFormPage, submitContactForm } from './contact/contact.js';

const router = Router();

router.get('/', inventoryListPage);
router.get('/inventory/:slug', vehicleDetailPage);
router.get('/contact', contactFormPage);
router.post('/contact', submitContactForm);

export default router;
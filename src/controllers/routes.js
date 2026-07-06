import { Router } from 'express';
import { inventoryListPage, vehicleDetailPage } from './inventory/inventory.js';

const router = Router();

router.get('/', inventoryListPage);
router.get('/inventory/:slug', vehicleDetailPage);


export default router;
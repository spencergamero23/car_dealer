import { body, validationResult } from 'express-validator';
import { createServiceRequest, getServiceRequestsByUser } from '../../models/service/service.js';

const VALID_SERVICE_TYPES = ['Oil Change', 'Inspection', 'Tire Rotation', 'Brake Service', 'General Repair'];

const serviceRequestValidation = [
    body('vehicleInfo').trim().isLength({ min: 1, max: 255 }).withMessage('Please describe your vehicle'),
    body('serviceType').isIn(VALID_SERVICE_TYPES).withMessage('Please select a valid service type'),
    body('notes').optional({ checkFalsy: true }).trim().isLength({ max: 1000 }).withMessage('Notes are too long')
];

const showServiceRequestForm = (req, res) => {
    res.render('service/new', { title: 'Request Service' });
};

const submitServiceRequest = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/service-requests/new');
    }

    const { vehicleInfo, serviceType, notes } = req.body;

    await createServiceRequest(req.session.user.id, vehicleInfo, serviceType, notes);

    res.redirect('/service-requests');
};

const showServiceRequestHistory = async (req, res) => {
    const requests = await getServiceRequestsByUser(req.session.user.id);

    res.render('service/history', { title: 'My Service Requests', requests });
};

export { serviceRequestValidation, showServiceRequestForm, submitServiceRequest, showServiceRequestHistory };
import { createServiceRequest, getServiceRequestsByUser } from '../../models/service/service.js';

const showServiceRequestForm = (req, res) => {
    res.render('service/new', { title: 'Request Service' });
};

const submitServiceRequest = async (req, res) => {
    const { vehicleInfo, serviceType, notes } = req.body;

    await createServiceRequest(req.session.user.id, vehicleInfo, serviceType, notes);

    res.redirect('/service-requests');
};

const showServiceRequestHistory = async (req, res) => {
    const requests = await getServiceRequestsByUser(req.session.user.id);

    res.render('service/history', { title: 'My Service Requests', requests });
};

export { showServiceRequestForm, submitServiceRequest, showServiceRequestHistory };
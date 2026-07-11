import { body, validationResult } from 'express-validator';
import { createContactSubmission } from '../../models/contact/contact.js';

const contactValidation = [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 20 }).withMessage('Phone number is too long'),
    body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message cannot be empty')
];

const contactFormPage = (req, res) => {
    res.render('contact/form', { title: 'Contact Us' });
};

const submitContactForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/contact');
    }

    const { name, email, phone, message } = req.body;

    await createContactSubmission({ name, email, phone, message });

    req.flash('success', 'Thanks! Your message has been sent.');
    res.redirect('/contact');
};

export { contactValidation, contactFormPage, submitContactForm };
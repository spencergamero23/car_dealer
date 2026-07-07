import { createContactSubmission } from "../../models/contact/contact";

const contactFormPage = (req, res) => {
    res.render('contact/form', { title: 'Contact Us'});
};

const submitContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;

    await createContactSubmission({ name, email, phone, message});
    
    res,render('contact/form', {
        title: 'Contact Us',
        success: true
    });
};

export { contactFormPage, submitContactForm };
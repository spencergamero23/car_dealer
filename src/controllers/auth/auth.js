import { body, validationResult } from 'express-validator';
import { emailExists, createUser, findUserByEmail, verifyPassword } from '../../models/users/users.js';

const registrationValidation = [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').isLength({ min: 8, max: 128 }).withMessage('Password must be at least 8 characters')
];

const loginValidation = [
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

const showRegistrationForm = (req, res) => {
    res.render('auth/register', { title: 'Register' });
};

const processRegistration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/register');
    }

    const { name, email, password } = req.body;

    try {
        if (await emailExists(email)) {
            req.flash('error', 'An account with that email already exists.');
            return res.redirect('/register');
        }

        await createUser(name, email, password);
        req.flash('success', 'Account created! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('auth/login', { title: 'Log In' });
};

const processLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/login');
    }

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.password))) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        delete user.password;
        req.session.user = user;
        req.flash('success', `Welcome back, ${user.name}!`);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    if (!req.session) return res.redirect('/');
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};

export {
    registrationValidation, loginValidation,
    showRegistrationForm, processRegistration,
    showLoginForm, processLogin, processLogout
};
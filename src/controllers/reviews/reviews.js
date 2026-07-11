import { body, validationResult } from 'express-validator';
import { createReview, getReviewById, updateReview, deleteReview } from '../../models/reviews/reviews.js';

const reviewValidation = [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().isLength({ min: 1, max: 1000 }).withMessage('Review cannot be empty')
];

const submitReview = async (req, res) => {
    const vehicleSlug = req.params.slug;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect(`/inventory/${vehicleSlug}`);
    }

    const { rating, comment } = req.body;

    await createReview(req.session.user.id, vehicleSlug, rating, comment);

    res.redirect(`/inventory/${vehicleSlug}`);
};

const showEditReviewForm = async (req, res) => {
    const review = await getReviewById(req.params.id);

    if (!review || review.user_id !== req.session.user.id) {
        return res.redirect('/');
    }

    res.render('reviews/edit', { title: 'Edit Review', review });
};

const processEditReview = async (req, res) => {
    const review = await getReviewById(req.params.id);

    if (!review || review.user_id !== req.session.user.id) {
        return res.redirect('/');
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect(`/reviews/${req.params.id}/edit`);
    }

    const { rating, comment } = req.body;
    await updateReview(req.params.id, rating, comment);

    res.redirect(`/inventory/${review.vehicle_slug}`);
};

const processDeleteReview = async (req, res) => {
    const review = await getReviewById(req.params.id);

    if (!review || review.user_id !== req.session.user.id) {
        return res.redirect('/');
    }

    await deleteReview(req.params.id);

    res.redirect(`/inventory/${review.vehicle_slug}`);
};

export { reviewValidation, submitReview, showEditReviewForm, processEditReview, processDeleteReview };
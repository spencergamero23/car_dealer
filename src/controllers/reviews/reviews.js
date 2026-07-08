import { createReview, getReviewById, updateReview, deleteReview } from '../../models/reviews/reviews.js';

const submitReview = async (req, res) => {
    const { rating, comment } = req.body;
    const vehicleSlug = req.params.slug;

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

export { submitReview, showEditReviewForm, processEditReview, processDeleteReview };
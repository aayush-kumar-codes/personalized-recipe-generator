const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ReviewSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

// POST: Create a new review
router.post('/', async (req, res) => {
    const { recipeId, userId, rating, review } = req.body;

    if (!recipeId || !userId || !rating || !review) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newReview = new Review({ recipeId, userId, rating, review });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Retrieve reviews for a specific recipe
router.get('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const reviews = await Review.find({ recipeId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE: Delete a review
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
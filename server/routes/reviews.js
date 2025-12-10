const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ReviewSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
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
        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET: Retrieve reviews for a specific recipe
router.get('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const reviews = await Review.find({ recipeId }).populate('userId', 'username');
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT: Update a review
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { rating, review } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { rating, review }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE: Delete a review
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
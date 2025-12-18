const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Review = mongoose.model('Review', new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}));

router.post('/', async (req, res) => {
    const { recipeId, userId, rating, comment } = req.body;

    if (!recipeId || !userId || !rating || !comment) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const review = new Review({ recipeId, userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const reviews = await Review.find({ recipeId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
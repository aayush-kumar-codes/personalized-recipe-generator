const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan'); // Assuming MealPlan is a Mongoose model
const { body, validationResult } = require('express-validator');

// Create a new meal plan
router.post('/create', [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('meals').isArray().withMessage('Meals must be an array'),
    body('meals.*.day').isString().withMessage('Day must be a string'),
    body('meals.*.meal').isString().withMessage('Meal must be a string'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, meals } = req.body;

    try {
        const newMealPlan = new MealPlan({ userId, meals });
        await newMealPlan.save();
        res.status(201).json(newMealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get meal plan for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const mealPlan = await MealPlan.findOne({ userId });
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(200).json(mealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update meal plan
router.put('/update/:userId', [
    body('meals').isArray().withMessage('Meals must be an array'),
    body('meals.*.day').isString().withMessage('Day must be a string'),
    body('meals.*.meal').isString().withMessage('Meal must be a string'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const { meals } = req.body;

    try {
        const updatedMealPlan = await MealPlan.findOneAndUpdate(
            { userId },
            { meals },
            { new: true, runValidators: true }
        );

        if (!updatedMealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(200).json(updatedMealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete meal plan
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedMealPlan = await MealPlan.findOneAndDelete({ userId });
        if (!deletedMealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
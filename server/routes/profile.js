const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is defined in models/User.js
const { body, validationResult } = require('express-validator');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
};

// Update user dietary preferences and restrictions
router.put('/update', isAuthenticated, [
    body('dietaryPreferences').isArray().withMessage('Dietary preferences must be an array'),
    body('dietaryRestrictions').isArray().withMessage('Dietary restrictions must be an array')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { dietaryPreferences, dietaryRestrictions } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dietaryPreferences = dietaryPreferences;
        user.dietaryRestrictions = dietaryRestrictions;

        await user.save();
        return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
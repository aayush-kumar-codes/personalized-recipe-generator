const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Assuming Recipe model is defined in models/Recipe.js
const mongoose = require('mongoose');

// POST route to get recipe suggestions based on ingredients and dietary preferences
router.post('/suggest', async (req, res) => {
    const { ingredients, dietaryPreferences } = req.body;

    // Validate input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Ingredients must be a non-empty array.' });
    }

    try {
        // Find recipes that match the ingredients and dietary preferences
        const recipes = await Recipe.find({
            ingredients: { $all: ingredients },
            dietaryPreferences: { $in: dietaryPreferences }
        });

        // Check if any recipes were found
        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for the given ingredients and dietary preferences.' });
        }

        // Return the found recipes
        return res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Create a new recipe
router.post('/', async (req, res) => {
    const { title, ingredients, instructions, userId } = req.body;
    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, userId });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
});

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('userId', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
});

// Rate a recipe
router.post('/:id/rate', async (req, res) => {
    const { rating, userId } = req.body;
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.ratings.push({ userId, rating });
        await recipe.save();
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error rating recipe', error });
    }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('userId', 'username');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error });
    }
});

module.exports = router;
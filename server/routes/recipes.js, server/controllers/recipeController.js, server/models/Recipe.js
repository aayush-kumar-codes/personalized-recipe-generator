// server/models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);

// server/controllers/recipeController.js
const Recipe = require('../models/Recipe');

exports.saveRecipe = async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const userId = req.user.id;

    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, userId });
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe saved successfully', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe', error: error.message });
    }
};

exports.getUserRecipes = async (req, res) => {
    const userId = req.user.id;

    try {
        const recipes = await Recipe.find({ userId });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recipes', error: error.message });
    }
};

// server/routes/recipes.js
const express = require('express');
const { saveRecipe, getUserRecipes } = require('../controllers/recipeController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/save', authenticate, saveRecipe);
router.get('/', authenticate, getUserRecipes);

module.exports = router;
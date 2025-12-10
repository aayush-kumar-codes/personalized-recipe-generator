const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Assuming Recipe model exists
const ShoppingList = require('../models/ShoppingList'); // Assuming ShoppingList model exists

// POST route to generate shopping list
router.post('/generate', async (req, res) => {
    const { mealPlan } = req.body;

    if (!mealPlan || !Array.isArray(mealPlan)) {
        return res.status(400).json({ error: 'Invalid meal plan provided' });
    }

    try {
        const ingredients = new Map();

        for (const recipeId of mealPlan) {
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ error: `Recipe with ID ${recipeId} not found` });
            }

            recipe.ingredients.forEach(ingredient => {
                const existingQuantity = ingredients.get(ingredient.name) || 0;
                ingredients.set(ingredient.name, existingQuantity + ingredient.quantity);
            });
        }

        const shoppingList = new ShoppingList({ ingredients: Array.from(ingredients.entries()).map(([name, quantity]) => ({ name, quantity })) });
        await shoppingList.save();

        return res.status(201).json({ message: 'Shopping list generated successfully', shoppingList });
    } catch (error) {
        console.error('Error generating shopping list:', error);
        return res.status(500).json({ error: 'An error occurred while generating the shopping list' });
    }
});

module.exports = router;
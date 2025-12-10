const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const MealPlan = require('../models/MealPlan');

// Generate shopping list based on selected recipes and meal plans
router.post('/generate', async (req, res) => {
    const { recipeIds, mealPlanId } = req.body;

    if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
        return res.status(400).json({ error: 'Invalid recipe IDs' });
    }

    try {
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });
        const mealPlan = await MealPlan.findById(mealPlanId);

        if (!mealPlan) {
            return res.status(404).json({ error: 'Meal plan not found' });
        }

        const shoppingList = {};

        // Aggregate ingredients from selected recipes
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const { name, quantity, unit } = ingredient;
                const key = `${name}-${unit}`;
                if (shoppingList[key]) {
                    shoppingList[key].quantity += quantity;
                } else {
                    shoppingList[key] = { name, quantity, unit };
                }
            });
        });

        // Optionally, add meal plan specific items
        mealPlan.additionalItems.forEach(item => {
            const key = `${item.name}-${item.unit}`;
            if (shoppingList[key]) {
                shoppingList[key].quantity += item.quantity;
            } else {
                shoppingList[key] = { name: item.name, quantity: item.quantity, unit: item.unit };
            }
        });

        res.status(200).json({ shoppingList: Object.values(shoppingList) });
    } catch (error) {
        console.error('Error generating shopping list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
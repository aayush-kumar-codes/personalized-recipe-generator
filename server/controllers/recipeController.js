const axios = require('axios');
const Recipe = require('../models/Recipe'); // Assuming a Recipe model exists
const User = require('../models/User'); // Assuming a User model exists

exports.getRecipeSuggestions = async (req, res) => {
    const { ingredients, preferences } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Ingredients are required and must be an array.' });
    }

    try {
        const aiResponse = await axios.post('https://api.example.com/recipe-suggestions', {
            ingredients,
            preferences
        });

        if (aiResponse.status !== 200) {
            return res.status(500).json({ error: 'Failed to fetch recipe suggestions from AI service.' });
        }

        const recipes = aiResponse.data.recipes;

        // Save suggested recipes to the database if needed
        for (const recipe of recipes) {
            await Recipe.create({
                title: recipe.title,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                userId: req.user.id // Assuming user is authenticated and user ID is available
            });
        }

        return res.status(200).json({ recipes });
    } catch (error) {
        console.error('Error fetching recipe suggestions:', error);
        return res.status(500).json({ error: 'An error occurred while fetching recipe suggestions.' });
    }
};
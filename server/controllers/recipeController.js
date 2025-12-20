const Recipe = require('../models/Recipe'); // Import the Recipe model
const UserPreferences = require('../models/UserPreferences'); // Import the UserPreferences model

// Function to get recipe suggestions based on ingredients and dietary preferences
exports.getRecipeSuggestions = async (req, res) => {
    const { ingredients, userId } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Ingredients must be a non-empty array.' });
    }

    try {
        // Fetch user dietary preferences
        const userPreferences = await UserPreferences.findOne({ userId });
        if (!userPreferences) {
            return res.status(404).json({ error: 'User preferences not found.' });
        }

        // Build query based on ingredients and dietary preferences
        const query = {
            $and: [
                { ingredients: { $all: ingredients } },
                { dietaryRestrictions: { $nin: userPreferences.dietaryRestrictions } }
            ]
        };

        // Fetch recipes from the database
        const recipes = await Recipe.find(query);
        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for the given ingredients and preferences.' });
        }

        return res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipe suggestions:', error);
        return res.status(500).json({ error: 'An error occurred while fetching recipe suggestions.' });
    }
};
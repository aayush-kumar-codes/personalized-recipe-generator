const ShoppingList = require('../models/ShoppingList');
const Recipe = require('../models/Recipe');

exports.generateShoppingList = async (req, res) => {
    const { recipeIds } = req.body;

    if (!Array.isArray(recipeIds) || recipeIds.length === 0) {
        return res.status(400).json({ error: 'Invalid recipe IDs' });
    }

    try {
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        if (recipes.length === 0) {
            return res.status(404).json({ error: 'No recipes found' });
        }

        const shoppingList = {};

        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const { name, quantity, unit } = ingredient;
                const key = `${name}-${unit}`;

                if (!shoppingList[key]) {
                    shoppingList[key] = { name, quantity: 0, unit };
                }
                shoppingList[key].quantity += quantity;
            });
        });

        const shoppingListArray = Object.values(shoppingList);

        const newShoppingList = new ShoppingList({
            userId: req.user.id,
            items: shoppingListArray,
        });

        await newShoppingList.save();

        return res.status(201).json(newShoppingList);
    } catch (error) {
        console.error('Error generating shopping list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your actual API key and endpoint
const NUTRITION_API_URL = 'https://api.nutritionix.com/v1_1/search/';
const NUTRITION_API_KEY = 'YOUR_API_KEY';

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
};

// Route to fetch nutritional information
router.get('/:recipe', async (req, res, next) => {
    const recipe = req.params.recipe;

    try {
        const response = await axios.get(`${NUTRITION_API_URL}${encodeURIComponent(recipe)}`, {
            params: {
                appId: 'YOUR_APP_ID',
                appKey: NUTRITION_API_KEY,
                fields: 'item_name,nf_calories,nf_protein,nf_total_fat,nf_total_carbohydrate'
            }
        });

        if (response.data.hits.length === 0) {
            return res.status(404).json({ message: 'No nutritional information found' });
        }

        const nutritionData = response.data.hits.map(item => ({
            name: item.fields.item_name,
            calories: item.fields.nf_calories,
            protein: item.fields.nf_protein,
            fat: item.fields.nf_total_fat,
            carbohydrates: item.fields.nf_total_carbohydrate
        }));

        res.status(200).json(nutritionData);
    } catch (error) {
        next(error);
    }
});

// Use the error handler middleware
router.use(errorHandler);

module.exports = router;
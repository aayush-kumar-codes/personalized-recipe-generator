const axios = require('axios');

const NUTRITION_API_URL = 'https://api.nutritionix.com/v1_1/search/';
const APP_ID = 'YOUR_APP_ID'; // Replace with your Nutritionix App ID
const APP_KEY = 'YOUR_APP_KEY'; // Replace with your Nutritionix App Key

const fetchNutritionalInfo = async (query) => {
    try {
        const response = await axios.get(`${NUTRITION_API_URL}${encodeURIComponent(query)}`, {
            params: {
                appId: APP_ID,
                appKey: APP_KEY,
                fields: 'item_name,nf_calories,nf_protein,nf_total_fat,nf_total_carbohydrate'
            }
        });

        if (response.data.hits.length === 0) {
            throw new Error('No nutritional information found for the given query.');
        }

        return response.data.hits.map(item => ({
            name: item.fields.item_name,
            calories: item.fields.nf_calories,
            protein: item.fields.nf_protein,
            fat: item.fields.nf_total_fat,
            carbohydrates: item.fields.nf_total_carbohydrate
        }));
    } catch (error) {
        console.error('Error fetching nutritional information:', error.message);
        throw new Error('Failed to fetch nutritional information. Please try again later.');
    }
};

module.exports = {
    fetchNutritionalInfo
};
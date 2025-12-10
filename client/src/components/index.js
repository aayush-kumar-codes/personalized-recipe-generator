import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.data.success) {
                history.push('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export const RecipeDisplay = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/api/recipes');
                setRecipes(response.data);
            } catch (err) {
                setError('Failed to fetch recipes.');
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes</h2>
            {error && <p>{error}</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export const MealPlanning = () => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState('');

    const handleAddMeal = async (meal) => {
        try {
            const response = await axios.post('/api/meals', meal);
            setMeals([...meals, response.data]);
        } catch (err) {
            setError('Failed to add meal.');
        }
    };

    return (
        <div>
            <h2>Meal Planning</h2>
            {error && <p>{error}</p>}
            <button onClick={() => handleAddMeal({ name: 'New Meal' })}>Add Meal</button>
            <ul>
                {meals.map((meal) => (
                    <li key={meal._id}>{meal.name}</li>
                ))}
            </ul>
        </div>
    );
};

export const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    const handleAddItem = async (item) => {
        try {
            const response = await axios.post('/api/shopping-list', item);
            setItems([...items, response.data]);
        } catch (err) {
            setError('Failed to add item to shopping list.');
        }
    };

    return (
        <div>
            <h2>Shopping List</h2>
            {error && <p>{error}</p>}
            <button onClick={() => handleAddItem({ name: 'New Item' })}>Add Item</button>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
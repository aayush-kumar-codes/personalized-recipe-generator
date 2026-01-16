# Personalized Recipe Generator ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellowgreen)

## Project Description
The **Personalized Recipe Generator** is a web application designed to help home cooks, food enthusiasts, and individuals optimize their meal planning. Users can input available ingredients and dietary preferences to generate personalized recipes, save their favorites, create meal plans, and generate shopping lists based on their selections.

## Features
- 👤 User authentication and profile management
- 🍽️ Ingredient-based recipe suggestions
- 🗓️ Meal planning and shopping list generation
- ⭐ User feedback and rating system for recipes
- 📊 Integration with external APIs for nutritional information

## Tech Stack
### Frontend
- **Next.js** 🌐

### Backend
- **FastAPI** 🚀

### Database
- **PostgreSQL** 🗄️

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/aayush-kumar-codes/personalized-recipe-generator.git
- Navigate to the project directory
bash
cd personalized-recipe-generator
- Create a virtual environment
bash
python -m venv venv
- Activate the virtual environment
bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
- Install the required dependencies
bash
pip install -r requirements.txt
- Set up the PostgreSQL database and update the connection settings in the `.env` file
- Run database migrations
bash
alembic upgrade head
- Start the FastAPI server
bash
uvicorn app.main:app --reload
- Start the Next.js development server in a new terminal
bash
cd frontend
npm install
npm run dev
## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Create an account or log in.
3. Input your available ingredients and dietary preferences.
4. Explore personalized recipe suggestions, save favorites, and generate meal plans and shopping lists.

## API Documentation
For detailed API documentation, please refer to the [API Docs](https://github.com/aayush-kumar-codes/personalized-recipe-generator/docs/api.md).

## Testing
To run the tests, execute the following command:
bash
pytest
## Deployment
To deploy the application, follow these steps:
- Build the Next.js application for production
bash
cd frontend
npm run build
- Deploy the FastAPI application using a WSGI server like Gunicorn or Uvicorn.

## Contributing
We welcome contributions! Please follow these steps:
- Fork the repository
- Create a new branch (`git checkout -b feature/YourFeature`)
- Make your changes and commit them (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a pull request

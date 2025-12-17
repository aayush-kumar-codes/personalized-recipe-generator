# Personalized Recipe Generator ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellowgreen)

## Project Description
The **Personalized Recipe Generator** is a web application designed to help home cooks, food enthusiasts, and individuals with dietary restrictions discover meal inspiration. By inputting available ingredients and dietary preferences, users receive AI-driven recipe suggestions tailored to their needs. The app also fosters a community where users can share and rate recipes.

## Features
- 🔐 User authentication and profile management
- 🥗 Ingredient input with dietary preferences and restrictions
- 🤖 AI-driven recipe suggestions based on available ingredients
- 💾 Save and share favorite recipes
- 🌍 Community feature for users to submit and rate recipes

## Tech Stack
### Frontend
- React.js

### Backend
- Node.js

### Database
- MongoDB

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/aayush-kumar-codes/personalized-recipe-generator.git
- Navigate to the project directory
bash
cd personalized-recipe-generator
- Install dependencies for the backend
bash
cd backend
npm install
- Install dependencies for the frontend
bash
cd ../frontend
npm install
- Set up environment variables (create a `.env` file in the backend directory)
bash
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
- Start the backend server
bash
cd ../backend
npm start
- Start the frontend server
bash
cd ../frontend
npm start
## Usage
1. Open your web browser and navigate to `http://localhost:3000`.
2. Create an account or log in to your existing profile.
3. Input your available ingredients and dietary preferences.
4. Explore personalized recipe suggestions and save your favorites.
5. Engage with the community by submitting and rating recipes.

## API Documentation
For detailed API documentation, please refer to the [API Documentation](https://github.com/aayush-kumar-codes/personalized-recipe-generator/wiki/API-Documentation).

## Testing
To run tests for the backend, follow these steps:

- Navigate to the backend directory
bash
cd backend
- Run the tests
bash
npm test
## Deployment
To deploy the application, follow these steps:

- Build the frontend
bash
cd frontend
npm run build
- Deploy the backend to your preferred hosting service (e.g., Heroku, AWS).
- Ensure the environment variables are set correctly in the production environment.

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to the contributors and the open-source community for their invaluable support and resources.
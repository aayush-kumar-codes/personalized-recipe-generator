# Personalized Recipe Generator ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellowgreen)

## Project Description
The **Personalized Recipe Generator** is a web application designed to help home cooks, food enthusiasts, and individuals with dietary restrictions discover meal inspiration. By inputting available ingredients and dietary preferences, users can generate personalized recipes, save their favorites, and contribute to a community recipe database.

## Features
- User authentication and profile management
- Ingredient input with dietary preferences and restrictions
- Dynamic recipe generation based on available ingredients
- Save and share favorite recipes
- Community feature for users to submit and rate recipes

## Tech Stack
### Frontend
- **React** ![React](https://img.shields.io/badge/React-16.13.1-blue)

### Backend
- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-14.17.0-green)

### Database
- **MongoDB** ![MongoDB](https://img.shields.io/badge/MongoDB-4.4.0-yellow)

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/aayush-kumar-codes/personalized-recipe-generator.git
- Navigate to the project directory
bash
cd personalized-recipe-generator
- Install the dependencies for the backend
bash
cd backend
npm install
- Install the dependencies for the frontend
bash
cd ../frontend
npm install
- Set up your environment variables (refer to `.env.example` for required variables)
- Start the backend server
bash
cd ../backend
npm start
- Start the frontend application
bash
cd ../frontend
npm start
## Usage
1. Open your web browser and navigate to `http://localhost:3000`.
2. Create an account or log in to your existing profile.
3. Input your available ingredients and dietary preferences.
4. Explore the generated recipes, save your favorites, and share them with the community.

## API Documentation
For detailed API documentation, please refer to the [API Documentation](https://github.com/aayush-kumar-codes/personalized-recipe-generator/wiki/API-Documentation).

## Testing
To run tests for the backend, navigate to the backend directory and execute:
bash
cd backend
npm test
For frontend tests, navigate to the frontend directory and execute:
bash
cd frontend
npm test
## Deployment
To deploy the application, follow these steps:
- Build the frontend application
bash
cd frontend
npm run build
- Deploy the backend and frontend to your preferred hosting service (e.g., Heroku, Vercel).

## Contributing
We welcome contributions! Please follow these steps:
- Fork the repository
- Create a new branch (`git checkout -b feature/YourFeature`)
- Make your changes and commit them (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to the contributors and the open-source community for their invaluable resources and support.
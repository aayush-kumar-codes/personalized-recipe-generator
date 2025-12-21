#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define environment variables
export NODE_ENV=production
export MONGODB_URI="your_mongodb_connection_string"
export PORT=3000

# Build the React application
echo "Building the React application..."
cd client
npm install
npm run build

# Move the build files to the server directory
echo "Moving build files to server directory..."
mv build ../server/public

# Navigate to the server directory
cd ../server

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Start the server
echo "Starting the server..."
node server.js &

# Wait for the server to start
sleep 5

# Check if the server is running
if curl -s http://localhost:$PORT > /dev/null; then
  echo "Server is running successfully."
else
  echo "Server failed to start." >&2
  exit 1
fi

echo "Deployment preparation completed successfully."
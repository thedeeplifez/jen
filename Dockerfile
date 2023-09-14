# Use an official Node.js runtime as a base image (Node.js 16.x)
FROM node:16-alpine3.14

# Set the working directory in the container
WORKDIR /usr/src/app

# Initialize a new Nuxt.js project with a specific version using npm
RUN npm init -y nuxt 3.5.3

# Change to the newly created Nuxt.js project directory
WORKDIR /usr/src/app/my-nuxt

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies, ignoring npm engine warnings
RUN npm install --no-optional

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app will run on (adjust if needed)
EXPOSE 3000

# Define the command to start your application
CMD [ "npm", "run", "dev" ]


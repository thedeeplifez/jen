# Use the official Node.js image as the base image
FROM node:17-alpine3.14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build your Nuxt.js application for the desired environment (e.g., "dev")
RUN npm run build_dev

# Expose the port your Nuxt.js app will run on (if needed)
EXPOSE 3000

# Start your Nuxt.js application for the desired environment (e.g., "dev")
CMD ["npm", "start_dev"]


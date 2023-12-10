# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY /nodejs/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY ./nodejs /app

RUN chmod +x /app/deal-card-cli

RUN npm run build:styles

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]

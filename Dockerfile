# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the app (if using TypeScript)
RUN npm run build

# Expose the application port (default NestJS port)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]

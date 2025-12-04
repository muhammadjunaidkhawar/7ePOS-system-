# Use Node.js 18 (lightweight Alpine version)
FROM --platform=linux/amd64 node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose your app's port (change if different)
EXPOSE 5000

# Start the Express app
CMD ["node", "server.js"]
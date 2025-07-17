# Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port (if needed)
EXPOSE 8080

# Command to run your bot
CMD ["node", "src/index.js"]

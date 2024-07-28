# back-end/Dockerfile
FROM node:20.14.0

WORKDIR /app

COPY package*.json ./ 
# Install dependencies for back-end
RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Copy the remaining application code for back-end
COPY . .

# Run TypeScript build
RUN npm run build


# Command to start the app using 'npm start' for back-end
CMD ["npm", "start"]
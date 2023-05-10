FROM node:lts-alpine

WORKDIR /app

# Copy package and package-lock.json.
COPY package*.json ./
# Install packages.
RUN npm install
# Allow Vue to be accessed outside of the container.
ENV HOST=0.0.0.0
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]
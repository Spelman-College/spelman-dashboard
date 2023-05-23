FROM node:lts-alpine

WORKDIR /app

# Copy package.json.
COPY package.json ./
# Install packages.
RUN npm install
CMD ["npm", "run", "dev"]

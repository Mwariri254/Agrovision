FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port (default 3001)
EXPOSE 3001

CMD [ "node", "server/index.js" ]

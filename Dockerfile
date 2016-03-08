
# NodeJS
# -----------------------------------------
FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install node dependencies
COPY package.json /usr/src/app/
RUN npm install

# Copy app source code to virtual machine
COPY . /usr/src/app

# RUN npm config set production && npm install

EXPOSE 5000

# npm start executes 'node server.js'
# main, there can only be on CMD per Dockerfile
CMD [ "npm", "start" ]



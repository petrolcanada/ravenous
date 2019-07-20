FROM node:10
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm isntall

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
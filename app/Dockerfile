# This Dockerfile is for the source environment.  It will create a container that sets up a local
# development server that will automatically refresh for you.
# To use this source environment:
# $ docker-compose down && docker-compose up -d

# Set up base node image
FROM node:18.12-alpine

# Set up the Docker Working Directory
ENV HOME=/usr/src/app
WORKDIR $HOME

RUN npm install -g gatsby-cli@5.0.0

# Pulls in the package.json file and installs all the node dependencies
# The .dockerignore file should ignore the node module since the container will operate on a
# linux server.
COPY ./package.json $HOME
# COPY ./package-lock.json $HOME

# Install Node Dependencies.
RUN npm install

# Copies the host machine folder(s) into the docker container so you can develop on your host
# machine
COPY . .

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
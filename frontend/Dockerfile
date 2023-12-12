FROM node:19.0-alpine

# set working directory
WORKDIR .

# add _/usr/src/app/node_modules/.bin_ to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY . .

RUN yarn install --production



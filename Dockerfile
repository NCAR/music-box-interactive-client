FROM node:19-bullseye

RUN npm install -g vite

# move our files into docker
COPY . /music-box-interactive-client

WORKDIR /music-box-interactive-client

# install site dependencies and build
RUN npm install 
RUN npm run build
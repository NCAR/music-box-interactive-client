FROM fedora:37

# install packages
RUN dnf -y update \
    && dnf -y install \
        gcc \
        g++ \
        make \
        nodejs \
    && dnf clean all

# install gatsby
RUN npm install -g gatsby-cli

# move our files into docker
COPY . /music-box-interactive-client

WORKDIR /music-box-interactive-client/generator

# install site dependencies and build
RUN npm install --legacy-peer-deps
RUN npm install d3 --legacy-peer-deps
RUN gatsby build

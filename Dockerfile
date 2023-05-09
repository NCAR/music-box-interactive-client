FROM fedora:37

# install packages
RUN dnf -y update \
    && dnf -y install \
        nodejs \
    && dnf clean all

# install gatsby
RUN npm install -g gatsby-cli

# move our files into docker
COPY . /music-box-interactive-client

# install site dependencies and build
RUN cd /music-box-interactive-client/generator \
    && npm install --legacy-peer-deps \
    && gatsby build

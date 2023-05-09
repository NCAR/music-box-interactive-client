FROM httpd:latest

# install packages
RUN apt-get update \
    && apt-get -y install nodejs

# install gatsby 
RUN npm install -g gatsby-cli

# move our files into docker
COPY . /music-box-interactive-client

# work on them
WORKDIR /music-box-interactive-client

# install site dependencies and build
RUN npm install && gatsby build

# copy to httpd
RUN cp -r public/* /usr/local/apache2/htdocs/

CMD ["httpd-foreground"]
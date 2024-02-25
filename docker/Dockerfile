FROM node:lts-alpine
RUN apk add --update git

# deploying development environment
RUN git clone https://github.com/hyoo-ru/mam.git ./mam
WORKDIR ./mam
RUN npm install

# copy src
COPY ./ hyoo/crus

# build modules
RUN npm start hyoo/crus/app

WORKDIR ./hyoo/crus/app/-
ENTRYPOINT node node.js port=3000 &>> /var/log/sync.log

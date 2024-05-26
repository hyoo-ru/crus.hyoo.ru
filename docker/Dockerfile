FROM node:latest
RUN apt update
RUN apt install -y \
  openssl \
  libssl-dev \
  make \
  g++ \
  cmake

# deploying development environment
RUN git clone https://github.com/hyoo-ru/mam.git ./mam
WORKDIR ./mam
RUN npm install

# copy src
COPY ./ hyoo/crus

# build modules
RUN npm start hyoo/crus/app/run

WORKDIR ./hyoo/crus/app/run/-
ENTRYPOINT node node.js port=3000

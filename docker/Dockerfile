FROM node:22-alpine

#RUN apt-get update && apt install -y git

RUN apk add --no-cache git

# deploying development environment
RUN git clone https://github.com/hyoo-ru/mam.git ./mam
WORKDIR ./mam
RUN npm install

# copy src
COPY ./ hyoo/crus

# build modules
RUN npm start hyoo/crus/app/run


# reduse image size
FROM node:22-alpine
COPY --from=0 /mam/hyoo/crus/app/run/- /mam/hyoo/crus/app/run/-

WORKDIR /mam/hyoo/crus/app/run/-
ENTRYPOINT node node.js port=9090

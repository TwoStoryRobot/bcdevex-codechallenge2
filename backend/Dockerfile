
#
# Dockerfile for backend
#

FROM node:8-alpine as build
WORKDIR /usr/src/app/
COPY . /usr/src/app/
RUN npm install 
RUN npm run build

FROM node:8-alpine
WORKDIR /usr/src/app/
COPY . /usr/src/app/
COPY --from=build /usr/src/app/build /usr/src/app/build
RUN npm install --production
ENV NODE_ENV production
CMD [ "npm", "start" ]
EXPOSE 3500

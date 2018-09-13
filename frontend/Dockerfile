
#
# Dockerfile for frontend
#

FROM node:8-alpine as build
WORKDIR /usr/src/app
COPY . /usr/src/app/
ENV REACT_APP_API_URL http://localhost:3500/
ENV REACT_APP_CLIENT_ID 656587629888-4rvd0pv398dgderln9s6kuvr7kdn99k5.apps.googleusercontent.com
RUN npm install 
RUN npm run build

FROM nginx:1.15-alpine
COPY nginx-react.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

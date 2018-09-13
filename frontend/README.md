# Code Challenge Frontend

This is a React client application that performs user management in coordination
with a REST API. It utilizes Google OAuth to log the user in and register them.

## Environment Variables

The following environment variables are utilized:

```
REACT_APP_API_URL=http://localhost:3500 # Location of the REST API to query
REACT_APP_CLIENT_ID=test.apps.googleusercontent.com # Google Developer Client ID
```

The `REACT_APP_CLIENT_ID` must match the `CLIENT_ID` on the REST API.

## Quickstart

Provided you have node installed, you can get started with:

```bash
npm install # Install application dependencies
npm start # Start the react development environment
```

## Application Tasks

The client supports the following run tasks:

```bash
npm start # Start the development server
npm test # Run all test suites
npm run build # Build the application for production
npm run storybook # Start the storybook developer tool
npm run prettier # Run autoformatter
npm run eslint # Run code linter
```

## Docker

You can build/run a Docker image with the following commands:

```bash
docker build -t frontend . # Build the docker image
docker run -p 3000:3000 --name frontend -d frontend # Run image
docker stop frontend # Stop server
docker start frontend # Start server
```

This compiles the application and transfer the build files to an NGINX container
which serves the static assets.

There is also a [docker-compose.yml](../docker-compose.yml) file in the parent 
directory of this repository, which is the recommended way for starting a 
development or demo environment.

Note that the `Dockerfile` has hardcoded environment variables for development.
Alternatively, we could use build arguments. However, this was kept hardcoded
for compatibility with the Verison 1 docker-compose configuration, which does
not support providing build arguments. This allows support for older docker
environments that may not support Version 2 compose files.

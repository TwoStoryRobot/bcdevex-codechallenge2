# Code Challenge Backend

This is a node.js Koa-based API server that exposes API endpoints for user 
registration, user management, and email.

## Environment Variables

The following environment variables are utilized:

```
PORT=3500 # Port to listen on (Defaults to specified)
FROM_EMAIL=no-reply@code-challenge.com # Email to send from 
SMTP=smtp://username:password@host:1025 # SMTP service authentication
CORS_ORIGIN=http://myhost/ # Allowed CORS URI (Defaults to all origins) 
CLIENT_ID=test.apps.googleusercontent.com # Google Developer Client ID
POSTGRES_HOST=localhost # Database authentication (Defaults to specified)
POSTGRES_DB=code_challenge # Database authentication (Defaults to specified)
POSTGRES_PASSWORD=postgresadmin # Datbase authentication (Defaults to specified)
POSTGRES_USER=postgres # Database authentication (Defaults to specified)
POSTGRES_PORT=5432 # Database authentication (Defaults to specified)
```

## Quickstart

Provided you have node installed, you can get started with:

```bash
npm install # Install application dependencies
npm run build # Build the application
npm start # Run the application server
```

## Application Tasks

The server supports the following run tasks:

```bash
npm start # Start the server
npm test # Run all test suites
npm run build # Build the application
npm run watch # Start a build watch task for development
npm run prettier # Run autoformatter
npm run eslint # Run code linter
```

## Docker

You can build/run a Docker image with the following commands:

```bash
docker build -t backend . # Build the docker image
docker run --env-file .env -p 3500:3500 --name backend -d backend # Run image
docker stop backend # Stop server
docker start backend # Start server
```

There is also a [docker-compose.yml](../docker-compose.yml) file in the parent 
directory of this repository, which is the recommended way for starting a 
development or demo environment.

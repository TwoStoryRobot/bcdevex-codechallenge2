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

# Architecture

This application is relatively simple in scope and we have chosen to structure 
the application with this in mind. We opted not to use Redux as the state is 
fairly shallow and easily communicated through props or React Context. If this 
were a more complex REST application we would have used Redux. Ideally we would 
build using Apollo client to connect to a GraphQL server.

## Code organization

The source code is found in [`src/`](./src) and is written in modern Javascript 
syntax. A build step is required to transpile the code into standard Javascript 
consumable by browsers. We rely on create-react-app to setup this tooling for 
us.

All of our components can be found in [`src/components/`](./src/components).  
Because this app has few components, this approach is sufficient. As the 
component requirements grow, we would reevaluate and reorganize as necessary.

Similarly, tests for components can be found along side their respective 
component. The size of the application is small enough that this is not 
troublesome.

We have opted to include stories in their own directory however. Stories are 
not as related to the core of the app and we felt that they still belonged in 
their own directory.

## Testing

We use 
[react-testing-library](https://github.com/kentcdodds/react-testing-library) 
with jest to conduct automated testing of our core components. This allows us 
to simulate user interaction in some cases and perform snapshot testing to 
detect rendering issues.

Ideally we would have also tested high level page components (like the 
`RegisteredUser` component), but that would have required additional tooling 
such as mocking API calls. Given the time restrictions we opted to only conduct 
core component testing.

You can run the tests:

    npm test

There are some compatibility issues with some platforms (newer versions of 
MacOS) and Jest. If on a Mac, we recommend ensuring that you have the latest 
`watchman` installed

    brew install watchman

or running these tests on a Linux machine

## Storybook

We practice component driven development, which allows us to start work on 
components without the need for a functioning application. Core to this 
practice is a tool called [storybook](https://storybook.js.org/).

If you wish to explore the components that we storybooked, you can run the 
development server:

    npm run storybook

And connect to the server at [localhost:9001](http://localhost:9001/)

As with tests, we did not storybook our data boundary components as this would 
have required additional mocking tools that we did not feel there was time for.

#!/bin/bash

# Bring down any previously running containers
docker-compose down

# Build images
echo 'Building images...'
docker-compose build
echo 'Complete'

# Bring up new containers
docker-compose up
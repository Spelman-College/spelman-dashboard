#!/bin/bash

# Halt command on error
set -e

if [[ -z $(docker images --quiet --filter "reference=spelman-dashboard-frontend") ]]; then
  >&2 echo "Docker image ""spelman-dashboard-frontend"" not found."
  echo -n "Building image..."
  docker compose build >> /dev/null
  echo "Done."

  echo -n "Checking again for docker image ""spelman-dashboard-frontend""..."
  if [[ -z $(docker images --quiet --filter "reference=spelman-dashboard-frontend") ]]; then
    >&2 echo "ERROR: docker image ""spelman-dashboard-frontend"" not found. Check the docker-compose.yaml file to make sure the image name matches."
    exit 1
  fi
  echo "Found!"
fi

echo -n "Creating temporary container..."
container_id=$(docker create spelman-dashboard-frontend)
echo "Done."
echo -n "Copying node_modules..." 
docker cp $container_id:/app/node_modules . >> /dev/null
echo "Done."
echo -n "Removing temporary container..."
docker rm $container_id >> /dev/null
echo "Done."
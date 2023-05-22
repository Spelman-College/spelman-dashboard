#!/bin/bash

# Halt command on error
set -e

echo -n "Building image..."
docker compose build >> /dev/null
echo "Done."

echo -n "Creating temporary container..."
container_id=$(docker create spelman-dashboard-frontend)
echo "Done."
echo -n "Copying node_modules..." 
docker cp $container_id:/app/node_modules . >> /dev/null
echo "Done."
echo -n "Copying package-lock.json..." 
docker cp $container_id:/app/package-lock.json . >> /dev/null
echo "Done."
echo -n "Removing temporary container..."
docker rm $container_id >> /dev/null
echo "Done."
# Getting Started

## Prerequisites

1. [Install Docker](https://docs.docker.com/engine/install/).

## Initial Setup

1. Clone this repository and `cd` into it.
1. Set up your packages for the frontend: `cd frontend` and then `./run-after-changing-packages.sh`. This generates the `node_modules` folder and `package-lock.json` file in a Docker container and copies them locally. This is needed to run the site on your local machine.

## Running a Local Instance of the Dashboard

1. From the root of the repository, `cd frontend`. Then run `docker compose up` to start a local instance of the site.
1. Navigate to `http://localhost:8080` in your web browser to see the site.

    !!! tip

        As you make changes, you don't need to reload the site. Changes should appear automatically.

## Running a Local Instance of the Documentation Site

1. From the root of the repository, `cd docs`. Then run `docker compose up` to start a local instance of the site.
1. Navigate to `http://localhost:4627` (the port number spells "D-O-C-S") in your web browser to see the site.

    !!! tip

        As you make changes, you don't need to reload the site. Changes should appear automatically.
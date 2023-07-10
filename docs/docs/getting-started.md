# Getting Started

## Prerequisites

1. [Install Docker](https://docs.docker.com/engine/install/).

## Initial Setup

1. Clone this repository and `cd` into it.
1. Set up your packages for the frontend: `cd frontend` and then `./run-after-changing-packages.sh`. This generates the `node_modules` folder and `package-lock.json` file in a Docker container and copies them locally. This is needed to run the site on your local machine.
1. To verify that your image built successfully, run `docker image ls` and look for `spelman-dashboard-frontend`.

<details>
<summary>If you see the error ERROR: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/_ping": dial unix /var/run/docker.sock: connect: permission denied </summary>

Then run
`sudo chmod 666 /var/run/docker.sock` and retry `docker build .`.
</details>

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

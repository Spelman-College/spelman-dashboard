# Getting Started

## Setting up your dev environment
[Follow these steps](https://docs.docker.com/engine/install/) to install Docker. If you are using a Chromebook or Pixelbook, you may need to [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/).

Clone this repo and cd into the directory containing the Dockerfile for the frontend (the `frontend` folder in the repo).

Run 
`./run-after-changing-packages.sh`.

To verify that your image built successfully, run 
`docker image ls`
and look for `spelman-dashboard-frontend`.


<details>
<summary>If you see the error ERROR: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/_ping": dial unix /var/run/docker.sock: connect: permission denied </summary>

Then run
`sudo chmod 666 /var/run/docker.sock` and retry `docker build .`.
</details>


Run
`docker compose up`
to start the container. `docker compose` simplifies `docker run` by interpreting command line args from `docker-compose.yaml` rather than as CLI flags. 

Navigate to `localhost:8080` in your browser to confirm the results.

#### Flags
`-d`: Runs Docker container in the background 

`--name`: Specifies a container name

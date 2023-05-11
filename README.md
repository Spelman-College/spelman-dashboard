# Getting Started

## Setting up your dev environment
[Follow these steps](https://docs.docker.com/engine/install/) to install Docker. If you are using a Chromebook or Pixelbook, you may need to [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/).

To build your Docker image with name `test-image`, cd into the directory of your Dockerfile and run
`docker build -t test-image .`

<details>
<summary>If you see the error `ERROR: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/_ping": dial unix /var/run/docker.sock: connect: permission denied`</summary>

Then run
`sudo chmod 666 /var/run/docker.sock` and retry `docker build .`.
</details>
  
To verify that your image built successfully, run 
`docker image ls`.

Next, create a container named `test-app` from your image `test-image`:

`docker run -d --name test-app test-image`

Confirm your container is running with `docker ps`. Navigate to `localhost:8080` in your browser to see the results.

#### Flags
`-d`: Runs Docker container in the background 

`--name`: Specifies a container name

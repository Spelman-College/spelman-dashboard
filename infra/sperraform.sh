#/bin/sh

if [[ -z $(docker images --quiet --filter "reference=infra") ]]; then
    docker build -t infra .
fi

docker run -it -v $(pwd):/infra --env-file .env_creds infra "$@"
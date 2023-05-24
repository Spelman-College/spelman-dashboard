#/bin/sh

if [[ -z $(docker images --quiet --filter "reference=infra") ]]; then
    docker build -t infra .
fi

docker run -v $(pwd):/infra infra "$@"
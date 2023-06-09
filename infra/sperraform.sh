#/bin/sh

if [[ -z $(docker images --quiet --filter "reference=infra") ]]; then
    docker build -t infra .
fi

docker run \
-it \
-v $(pwd):/infra \
-v $(pwd)/.terraform.d:/root/.terraform.d \
-e "AWS_SHARED_CREDENTIALS_FILE=/infra/.aws_credentials" \
infra terraform "$@"
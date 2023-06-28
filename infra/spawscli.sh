#/bin/sh

if [[ -z $(docker images --quiet --filter "reference=infra") ]]; then
    docker build -t infra .
fi

docker run \
-it \
--mount type=bind,source="$(pwd)",target=/infra \
-e "AWS_PROFILE=driftctlrole" \
-e "AWS_CONFIG_FILE=/infra/aws_config" \
-e "AWS_SHARED_CREDENTIALS_FILE=/infra/.aws_credentials" \
infra aws "$@"
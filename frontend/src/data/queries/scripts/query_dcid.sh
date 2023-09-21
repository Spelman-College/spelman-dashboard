#!/bin/bash
## REQUIRED:
# Set the environment variable DCKEY to the Data Commons API key
# for the respective environment prod or autopush.

## Using prod by default.
# Use autopush if second argument is not given.
HOST='https://autopush.api.datacommons.org'
if [ -z $2 ]; then
  # Use prod if additional arg is not given.
  HOST="https://api.datacommons.org"
fi

BASE_PATH="/v1/observations/series"
ENTITY=country/USA
KEY="${DCKEY}"
URL="${HOST}${BASE_PATH}/${ENTITY}/$1?key=${KEY}"
echo "${URL}"
curl "${URL}" | jq -r

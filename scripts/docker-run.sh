#!/bin/bash

export $(cat .env | xargs)
docker run \
    --rm \
    -it --env-file .env \
    --name API-Services-$SERVICE_NAME \
    --network barti \
    -v $PWD:/usr/src/app \
    -v /usr/src/app/node_modules \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --link mongodb \
    --label name=$SERVICE_NAME \
    --label route=/$SERVICE_NAME \
    monsieurbarti/api/$SERVICE_NAME:local

echo "Run monsieurbarti/api/$SERVICE_NAME:local"

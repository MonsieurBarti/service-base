#!/bin/bash
export $(cat .env | xargs)
docker build -t monsieurbarti/api/$SERVICE_NAME:local .

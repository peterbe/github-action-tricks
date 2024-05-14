#!/bin/bash

echo "Hello"

echo "APP_NAME_SEED: $APP_NAME_SEED"

curl -X GET "https://httpbin.org/get?secret=$APP_NAME_SEED" -H "accept: application/json"

echo "LIST ALL ENVIRONMENT VARIABLES..."

env

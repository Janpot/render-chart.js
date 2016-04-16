#!/bin/bash
VERSION="$(node -e "console.log(require('./package.json').version);")"

rm -rf ./node_modules

docker-compose run --rm chartjs_build

docker build -t "janpot/chartjs:$VERSION" .

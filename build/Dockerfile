FROM mhart/alpine-node:5

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache cairo-dev make g++ bash git

RUN mkdir -p /cache/npm && npm config set cache "/cache/npm" --global && npm config set cache-min 100000000 --global

WORKDIR /src

CMD ["npm", "i"]

FROM mhart/alpine-node:5

RUN apk add --no-cache cairo-dev

WORKDIR /src
COPY . .

RUN npm link

EXPOSE 3000
CMD ["app"]

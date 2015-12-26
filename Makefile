MAKEFLAGS = -j1

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: build-client build-server dev start test

build-client:
	webpack --config=./src/server/configs/webpack-client.js --progress

build-server:
	webpack --config=./src/server/configs/webpack-server.js --progress && rm -f ./lib/server.css

dev:
	export NODE_ENV=development && export DEBUG=clebert* && make build-server && node ./lib/server.js

start:
	export NODE_ENV=production && export DEBUG=clebert* && make build-client && make build-server && node ./lib/server.js

test:
	export NODE_ENV=test && export DEBUG=clebert* && make build-server && node ./lib/test.js

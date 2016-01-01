MAKEFLAGS = -j1

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: build-client build-server clean dev start test upgrade

build-client:
	webpack --config=./src/client/webpack.config.js --progress

build-server:
	webpack --config=./src/server/webpack.config.js --progress && rm -f ./lib/server.css

clean:
	rm -rf ./lib/* && rm -rf ./assets/client*

dev:
	export NODE_ENV=development && export DEBUG=clebert* && make clean && make build-server && node ./lib/server.js

start:
	export NODE_ENV=production && export DEBUG=clebert* && make clean && make build-client && make build-server && node ./lib/server.js

test:
	export NODE_ENV=test && export DEBUG=clebert* && make clean && make build-server && node ./lib/test.js

upgrade:
	ncu --upgradeAll

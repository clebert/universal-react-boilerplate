MAKEFLAGS = -j1

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: build clean dev start test

build:
	make clean && webpack --progress && rm -f ./lib/index.css

clean:
	rm -rf ./lib/

dev:
	export NODE_ENV=development && export DEBUG=clebert* && make build && node ./lib/index.js

start:
	export NODE_ENV=production && export DEBUG=clebert* && make build && node ./lib/index.js

test:
	export NODE_ENV=test && make build && node ./lib/test.js

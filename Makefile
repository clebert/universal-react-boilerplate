MAKEFLAGS = -j1

export DIRNAME := $(strip $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST)))))
export PATH := $(DIRNAME)/node_modules/.bin:$(PATH)
export SHELL := /bin/bash

.PHONY: build clean major minor patch publish

build: clean
	npm install && webpack --bail --progress $(DIRNAME)/src/index.js $(DIRNAME)/lib/index.js

clean:
	rm -rf $(DIRNAME)/lib/
	rm -rf $(DIRNAME)/npm-debug.log

major:
	npm version major && make publish

minor:
	npm version minor && make publish

patch:
	npm version patch && make publish

publish: test
	publish-please && git push && git push --tags

test: build
	webpack --bail --progress $(DIRNAME)/test/index.js $(DIRNAME)/lib/index.test.js && \
	node $(DIRNAME)/lib/index.test.js

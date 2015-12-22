MAKEFLAGS = -j1

export PATH := ./node_modules/.bin:$(PATH)

.PHONY: build build-dev clean

build: clean
	npm install && NODE_ENV=production webpack --bail --progress

build-dev: clean
	npm install && NODE_ENV=development webpack --bail --progress

clean:
	rm -rf ./lib/
	rm -rf ./npm-debug.log
	rm -rf ./public/

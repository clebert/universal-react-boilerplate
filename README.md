# Universal React Boilerplate

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/universal-react-boilerplate/master/LICENSE)

[Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) JavaScript Boilerplate with React and [Redux](https://github.com/gaearon/redux).

## Features

- A [React](https://facebook.github.io/react/) application that renders on both the client and the server.
- Support for next generation JavaScript (ES6, ES7 and JSX) through [Babel](https://babeljs.io/).
- A modern development workflow through the use of [webpack](http://webpack.github.io/).
This includes [automatic rebuilds](https://github.com/webpack/webpack-dev-server), [hot-loading](https://github.com/gaearon/react-hot-loader) of react components and source maps.
- Individual [ESLint](http://eslint.org/) rules for each environment.
The linting will be performed automatically right before a ```git commit```.
- A production-ready application server build with [Express](http://expressjs.com/).

## Getting Started

Changing to your newly created project directory:

```sh
cd path_to_my_new_project/
```

Downloading boilerplate files (existing files will be overwritten):

```sh
curl -#L https://github.com/clebert/universal-react-boilerplate/tarball/master \
| tar -xzv --strip-components 1
```

Installing npm dependencies:

```sh
npm install
```

## Starting Production Server

The production server will run on [localhost:8080](http://localhost:8080/).

```sh
npm run start
```

## Starting Development Server

The development server will run on [localhost:3000](http://localhost:3000/).

```sh
npm run start-dev
```

## Linting Source Code

This command will be automatically executed right before a ```git commit```:

```sh
npm run lint
```

## Building Source Code

This command will be automatically executed right before a ```git commit```:

```sh
npm run build
```

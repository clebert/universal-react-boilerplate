# Universal React Boilerplate

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) JavaScript Boilerplate with React and [Redux](https://github.com/rackt/redux).

## Features

- A [React](https://facebook.github.io/react/) application that renders on both the client and the server
- Support for next generation JavaScript (ES7 and JSX) through [Babel](https://babeljs.io/)
- A modern development workflow through the use of [Webpack](http://webpack.github.io/)
- A production-ready application server build with [Express](http://expressjs.com/)

## Installation

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

## Usage

Linting sources:

```sh
npm test
```

Running prod-server:

```sh
npm run prod
```

Running dev-server:

```sh
npm run dev
```

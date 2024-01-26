# STWebCLI

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![Node compatibility][node-compatibility-image]][node-compatibility-url]
[![MIT License][license-image]][license-url]

[npm-url]: https://npmjs.org/package/st-web-cli
[npm-version-image]: https://img.shields.io/npm/v/st-web-cli.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/st-web-cli.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/st-web-cli?minimal=true
[node-compatibility-image]: https://img.shields.io/node/v/st-web-cli.svg
[node-compatibility-url]: https://nodejs.org/en/about/releases
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

## A web project CLI.

STWebCLI is a web project CLI. You can use it to create many types of web projects.

## Requirements

-   node 12 or later
-   npm 6 or later

## Installation

```bash
npm install -g st-web-cli
# OR
yarn global add st-web-cli
# OR
pnpm add -g st-web-cli
```

## Usage

### Initialize a project

```bash
st-web-cli init project-name
```

And you can choose a template with the `--template` option.

### List all templates

```bash
st-web-cli list
```

And you can query template name with `--query` option.

### Update template config

```bash
st-web-cli update
```

### Check if there is a new version

```bash
st-web-cli upgrade
```

## Author

Suta, shien7654321@163.com

## License

[mit]: https://opensource.org/licenses/MIT

[MIT license][mit].

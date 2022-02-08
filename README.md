<p align="center">
    <a href="https://croct.com">
        <img src="https://cdn.croct.io/brand/logo/repo-icon-green.svg" alt="Croct" height="80"/>
    </a>
    <br />
    <strong>JavaScript Coding Standard</strong>
    <br />
    A set of <a href="https://eslint.org/">ESLint</a> rules applied to all Croct JavaScript projects.
</p>
<p align="center">
    <a href="https://github.com/croct-tech/coding-standard-js/actions/workflows/branch-validations.yaml">
        <img alt="Build" src="https://github.com/croct-tech/coding-standard-js/actions/workflows/branch-validations.yaml/badge.svg" />
    </a>
    <a href="https://codeclimate.com/repos/620292a0376562495b002392/maintainability"><img alt="Maintainability" src="https://api.codeclimate.com/v1/badges/c1fe99959c642f53697b/maintainability" /></a>
    <a href="https://codeclimate.com/repos/620292a0376562495b002392/test_coverage"><img alt="Coverage" src="https://api.codeclimate.com/v1/badges/c1fe99959c642f53697b/test_coverage" /></a>
    <br />
    <br />
    <a href="https://github.com/croct-tech/coding-standard-js/releases">📦 Releases</a>
    ·
    <a href="https://github.com/croct-tech/coding-standard-js/issues">🐞 Report Bug</a>
    ·
    <a href="https://github.com/croct-tech/coding-standard-js/issues">✨ Request Feature</a>
</p>

## Installation

The recommended way to install the SDK is via [NPM](https://npmjs.com). It pairs nicely with module bundlers such as
Webpack or Browserify:

```sh
npm i -D @croct/eslint-plugin
```

Then, add the following to your `.eslintrc.js` file:

```js
// This is needed to avoid adding the transitive ESLint dependencies of the plugin to the project
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
   "plugins": ["@croct"]
}
```

Note the `require` call at the top of the file. This is a workaround to avoid adding the transitive dependencies of 
the plugin to the project, which is [currently not supported by the ESLint plugin system](https://github.com/eslint/eslint/issues/3458).

For TypeScript projects, there are a few more steps. 

First, you need to install the TypeScript parser:

```sh
npm i -D @typescript-eslint/parser
```

Then, add the following to your `.eslintrc.js` file:

```js
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@croct"
    ],
    "extends": [
      "plugin:@croct/typescript"
    ],
    "parserOptions": {
      "extends": "./tsconfig.json",
      "project": ["./tsconfig.json"]
    },
}
```

For the list for available presets and rules, see the [reference documentation](docs/README.md). 

## Basic usage

Run the following command to check if the project adheres to the coding standard:

```sh
eslint
```

## Contributing

Contributions to the package are always welcome!

- Report any bugs or issues on the [issue tracker](https://github.com/croct-tech/coding-standard-js/issues).
- For major changes, please [open an issue](https://github.com/croct-tech/coding-standard-js/issues) first to discuss what you would like to change.
- Please make sure to update tests as appropriate.

## Testing

Before running the test suites, the development dependencies must be installed:

```sh
npm i
```

Then, to run all tests:

```sh
npm run test
```

## Copyright Notice

Copyright © 2015-2021 Croct Limited, All Rights Reserved.

All information contained herein is, and remains the property of Croct Limited. The intellectual, design and technical concepts contained herein are proprietary to Croct Limited s and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Croct Limited.

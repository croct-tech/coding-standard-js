# Croct ESLint Reference

A set of ESLint rules that enforce best practices used in Croct projects.

## Presets

These are the current available presets:

### JavaScript

Enforces Croct's standard JavaScript best practices.

To enable this preset, add the following to your `.eslintrc` file:

```json
{
  "plugins": [
    "@croct"
  ],
  "extends": [
    "plugin:@croct/javascript"
  ]
}
```

### TypeScript

Enforces Croct's standard TypeScript best practices.

To enable this preset, add the following to your `.eslintrc.js` file:

```js
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    plugins: ['@croct'],
    extends: ['plugin:@croct/typescript'],
    parserOptions: {
        project: ['**/tsconfig.json'],
    },
};
```

This preset extends the JavaScript preset – no need to include it as well.

### React

Enforces best practices for React-based projects.

To enable this preset, add the following to your `.eslintrc` file:

```json
{
  "plugins": [
    "@croct"
  ],
  "extends": [
    "plugin:@croct/react"
  ]
}
```

This preset extends the JavaScript preset – no need to include it as well.

### Cypress

Enforces Croct's best practices for writing Cypress acceptance tests

To enable this preset, add the following to your `.eslintrc` file:

```json
{
  "plugins": [
    "@croct"
  ],
  "extends": [
    "plugin:@croct/cypress"
  ]
}
```

This preset extends the JavaScript preset – no need to include it as well.

## Custom rules

The plugin also ships with a few custom ESLint rules, all enabled by default in the related preset.

| Rule                                                              | Description                                                                                         |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [argument-spacing](rules/argument-spacing.md)                     | Enforces a surrounding line break before and after the argument list in multiline functional calls. |
| [new-per-chained-call](rules/newline-per-chained-call)            | Enforces a surrounding line break in multiline JSX attributes.                                      |
| [complex-expression-spacing](rules/complex-expression-spacing.md) | Enforces a surrounding line break in complex expression.                                            |
| [jsx-attribute-spacing](rules/jsx-attribute-spacing.md)           | Enforces a surrounding line break in multiline JSX attributes.                                      |

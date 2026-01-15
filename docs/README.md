# Croct ESLint Reference

A set of ESLint rules that enforce best practices used in Croct projects.

This plugin uses ESLint's [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files) (ESLint v9+).

## Presets

These are the current available presets:

### JavaScript

Enforces Croct's standard JavaScript best practices.

To enable this preset, create an `eslint.config.mjs` file:

```js
import { defineConfig } from 'eslint/config';
import croct from '@croct/eslint-plugin';

export default defineConfig(
    croct.configs.javascript,
);
```

### TypeScript

Enforces Croct's standard TypeScript best practices.

To enable this preset, create an `eslint.config.mjs` file:

```js
import { defineConfig } from 'eslint/config';
import croct from '@croct/eslint-plugin';

export default defineConfig(
    croct.configs.typescript,
);
```

This preset extends the JavaScript preset – no need to include it as well.

### React

Enforces best practices for React-based projects.

To enable this preset, create an `eslint.config.mjs` file:

```js
import { defineConfig } from 'eslint/config';
import croct from '@croct/eslint-plugin';

export default defineConfig(
    croct.configs.react,
);
```

This preset extends the JavaScript preset – no need to include it as well.

### Cypress

Enforces Croct's best practices for writing Cypress acceptance tests.

To enable this preset, create an `eslint.config.mjs` file:

```js
import { defineConfig } from 'eslint/config';
import croct from '@croct/eslint-plugin';

export default defineConfig(
    croct.configs.cypress,
);
```

This preset extends the JavaScript preset – no need to include it as well.

## Custom rules

The plugin also ships with a few custom ESLint rules, all enabled by default in the related preset.

| Rule                                                              | Description                                                                                         |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [newline-per-chained-call](rules/newline-per-chained-call.md)     | Enforces a newline before chained calls.                                                            |
| [argument-spacing](rules/argument-spacing.md)                     | Enforces a surrounding line break before and after the argument list in multiline functional calls. |
| [complex-expression-spacing](rules/complex-expression-spacing.md) | Enforces a surrounding line break in complex expression.                                            |
| [jsx-attribute-spacing](rules/jsx-attribute-spacing.md)           | Enforces a surrounding line break in multiline JSX attributes.                                      |
| [min-chained-call-depth](rules/min-chained-call-depth.md)         | Enforces a minimum depth for multiline chained calls.                                               |

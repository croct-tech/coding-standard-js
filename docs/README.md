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

To enable this preset, add the following to your `.eslintrc` file:

```json
{
  "plugins": [
    "@croct"
  ],
  "extends": [
    "plugin:@croct/typescript"
  ]
}
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

| Rule                                                    | Description                                             |
|---------------------------------------------------------|---------------------------------------------------------|
| [argument-spacing](rules/argument-spacing.md)           | Enforce consistent spacing in multiline function calls. |
| [jsx-attribute-spacing](rules/jsx-attribute-spacing.md) | Enforce consistent spacing in JSX multiline attributes. |

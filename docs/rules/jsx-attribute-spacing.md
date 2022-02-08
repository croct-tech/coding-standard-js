# `jsx-attribute-spacing`

Enforces a surrounding line break in multiline JSX attributes.

## Rule details

This rule complements the [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)
to enforce multiline attributes to have a new line before and after the first and last braces, respectively.

## How to use

```json
{
  "@croct/argument-spacing": ["error"]
}
```

## Examples

These are examples of how the rule might apply.

### ❌ Incorrect

```jsx
<Example
    enabled={isEnabled
        ? true
        : false}
/>
```

### ✅ Correct

```jsx
<Example
    enabled={
        isEnabled
            ? true
            : false
    }
/>
```

```jsx
<Example
    values={{
        foo: 1,
        bar: 2
    }}
/>
```

```jsx
<Example
    values={[
        1,
        2,
    ]}
/>
```

## Options

This rule has no configuration options.

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

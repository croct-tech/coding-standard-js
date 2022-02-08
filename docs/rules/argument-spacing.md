# `argument-spacing`

Enforces a surrounding line break before and after the argument list in multiline functional calls.

## Rule details

This rule complements the [`eslint/function-call-argument-newline`](https://eslint.org/docs/rules/function-call-argument-newline)
to enforce multiline arguments to have a new line before and after the first and last argument, respectively.

## How to use

```json
{
  "@croct/argument-spacing": ["error"]
}
```

## Examples

These are examples of how the rule might apply.

### ❌ Incorrect

```js
call(1,
    2);
```

```jsx
useEffect(() => {
  console.log(`Hello, ${name}!`);
}, []);
```

### ✅ Correct

```js
call(
    1,
    2,
);
```

```jsx
useEffect(
    () => {
        console.log(`Hello, ${name}!`);
    },
    [],
);
```

## Options

This rule has no configuration options.

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

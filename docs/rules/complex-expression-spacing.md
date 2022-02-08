# `complex-expression-spacing`

Enforces a surrounding line break in complex expression.

## How to use

```json
{
  "@croct/complex-expression-spacing": ["error"]
}
```

## Examples

These are examples of how the rule might apply.

### ❌ Incorrect

```js
list.filter(item => (item.name === 'foo'
? true
: false));
```

```js
list.filter(item => matches(
    item.name,
    item.constructor
));
```

```js
if (item.name === 'foo'
|| item.name === 'bar') {
  return true;
}
```

### ✅ Correct

```js
list.filter(
    item => (
        item.name === 'foo'
            ? true
            : false
    )
);
```

```js
list.filter(
    item => matches(
        item.name,
        item.constructor
    )
);
```

```js
if (
    item.name === 'foo'
    || item.name === 'bar'
) {
    return true;
}
```

## Options

This rule has no configuration options.

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

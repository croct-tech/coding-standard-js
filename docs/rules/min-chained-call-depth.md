# `min-chained-call-depth`

Enforces the minimum of 2 chained calls to be on the same line before allowing the following chained calls to have line breaks.

## How to use

```json
{
  "@croct/min-chained-call-depth": [
    "error",
    {
      "maxLineLength": 100
    }
  ]
}
```

## Examples

These are examples of how the rule might apply.

### ❌ Incorrect

```jsx
expect(screen.getElementById("very-long-identifier"))
    .toBe(true)
```

```jsx
expect(screen.getElementById("very-long-identifier"))
    .toBe({
        foo: true
    });
```

### ✅ Correct

```jsx
expect(screen.getElementById("very-long-identifier"))
    // comment
    .toBe(true);
```

```jsx
expect(screen.getElementById("very-long-identifier")).toBe({
    foo: true
});
```

## Options

These are the available options:

### `maxLineLength`

Specifies the maximum line length before allowing breaking chained calls, default is 100.

#### ❌ Incorrect

```jsx
expect(screen.getElementById("identifier"))
    .toBe(true);
```

#### ✅ Correct

```jsx
/*eslint min-chained-call-depth: ["error", {"maxLineLength": 63}]*/
expect(screen.getElementById("very-long-identifier"))
    .toBe(true);
```

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

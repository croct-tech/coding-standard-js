# `min-chained-call-depth`

Enforces a minimum of chained method calls to allow multiline chains, except when the chain is too long to fit on a
single line.

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
expect(screen.getElementById("very-long-identifier")).toBe(true);

expect(screen.getElementById("very-long-identifier"))
    // ...
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

Specifies the maximum line length so that the rule allows breaking into multiple lines cases that 
otherwise would not be permitted to avoid exceeding the line length limit.

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

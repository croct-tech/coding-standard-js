# `newline-per-chained-call`

Require a newline after each function call in a method chain.

## Rule details

This rule complements the [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call)
to enforce a new line after each chained function call, and also changing the ignoreChainWithDepth 
behavior to break chained calls recursively when the limit is reached.

## How to use

```json
{
  "@croct/newline-per-chained-call": [
    "error",
    {
      "ignoreChainWithDepth": 2
    }
  ]
}
```

## Examples

These are examples of how the rule might apply.

### ❌ Incorrect

```jsx
foo().bar().baz().qux();
```

```jsx
foo.bar.baz.qux();
```

### ✅ Correct

```jsx
foo()
    .bar()
    .baz()
    .qux();
```

```jsx
await expect(callback).resolves.toHaveBeenCalledWith();
```

```jsx
foo.bar.baz.qux;
```

## Options

This rule has no configuration options.

* "ignoreChainWithDepth" (default: 2) allows chains up to a specified depth.

### ignoreChainWithDepth

#### ❌ Incorrect

```jsx
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 1 }]*/
foo().bar().baz();
```

#### ✅ Correct

```jsx
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 1 }]*/
foo()
    .bar()
    .baz();
```

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

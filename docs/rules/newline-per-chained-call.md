# `newline-per-chained-call`

Enforces a newline before each chained method call after reaching a configurable maximum depth.

## Rule details

This rule differs from the [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call)
rule by enforcing a newline before each chained method call rather than only after the call that exceeded the maximum
depth. Another difference is that this rule only applies to chained method calls, not to chained property accessors.

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
this.foo.block.bar.qux();
```

```jsx
foo().bar().baz().qux();
```

```jsx
foo.bar.baz.qux();
```

### ✅ Correct

```jsx
this.foo
    .block
    .bar
    .qux();
```

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

These are the available options:

### `ignoreChainDeeperThan`

Specifies the maximum depth of chained allowed, default is 2.

#### ❌ Incorrect

```jsx
/*eslint newline-per-chained-call: ["error", {"ignoreChainWithDepth": 1}]*/
foo().bar().baz();
```

#### ✅ Correct

```jsx
/*eslint newline-per-chained-call: ["error", {"ignoreChainWithDepth": 1}]*/
foo()
    .bar()
    .baz();
```

## Attributes

- [ ] ✅ Recommended
- [x] 🔧 Fixable
- [ ] 💭 Requires type information

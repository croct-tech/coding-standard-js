# `jsx-attribute-spacing`

Enforce consistent spacing in JSX multiline attributes.

## Rule details

This rule complements the [`eslint/function-call-argument-newline`](https://eslint.org/docs/rules/function-call-argument-newline)
to enforce multiline arguments to have a new line before and after the first and last argument, respectively.

## How to use

```jsonc
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

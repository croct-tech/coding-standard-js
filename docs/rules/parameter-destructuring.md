# `parameter-destructuring`

Prevents the use of noisy destructuring patterns in parameter definition.

## Rule details

Complex and/or long destructuring patterns in parameters can make the function signature hard to read and understand.
It is better to use a names parameter and destructure the values in the function body. 

## How to use

```json
{
  "@croct/parameter-destructuring": [
    "error",
    {
      "allowSingleLine": true
    }
  ]
}
```

## Examples

These are examples of how the rule might apply:

### ❌ Incorrect

```js
function getPosts(
    {
        title,
        body,
        tags,
    },
    {cache},
) {}
```

```js
foo(({
    metadata: {
        name,
        description,
    },
    price,
}) => `${name}: ${description} - ${price}`);
```

### ✅ Correct

```js
function getPosts(includedFields, options) {
    const {title, body, tags} = includedFields;
    const {cache} = options;
}
```

```js
foo(plan => {
    const {
        metadata: {
            name,
            description,
        },
        price,
    } = plan;

    return `${name}: ${description} - ${price}`;
});
```

```jsx
foo(({name, description}) => `${name}: ${description}`);
```

## Options

These are the available options:

### `allowSingleLine`

Specifies whether to allow destructuring functions with a single parameter if the entire declaration is a single line.

Default: `true`

#### ❌ Incorrect

```jsx
/*eslint parameter-destructuring: ["error", {"allowSingleLine": false}]*/
foo(({name, description}) => `${name}: ${description}`);
```

#### ✅ Correct

```jsx
/*eslint parameter-destructuring: ["error", {"allowSingleLine": false}]*/
foo(content => {
    const {name, description} = content;

    return `${name}: ${description}`;
});
```

## Attributes

- [ ] ✅ Recommended
- [ ] 🔧 Fixable
- [x] ℹ️ Auto-suggestion
- [ ] 💭 Requires type information

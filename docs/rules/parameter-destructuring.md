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
function getPosts(includedFields, {cache}) {
    const {title, body, tags} = includedFields;
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

```js
foo(({name, description}) => `${name}: ${description}`);
```

## Attributes

- [ ] ✅ Recommended
- [ ] 🔧 Fixable
- [x] ℹ️ Auto-suggestion
- [ ] 💭 Requires type information

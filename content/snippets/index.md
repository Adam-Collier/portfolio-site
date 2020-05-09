## Immutability in React

### Update an object

```js
// state = {
//   clicks: 0,
//   count: 0
// }
return {
  ...state,
  clicks: state.clicks + 1,
  count: state.count - 1,
}
```

### Add an item to an array

```js
const newItem = "foo"
// a new array
return [
  ...state, // explode the old state first
  newItem, // then add the new item at the end
]
```

### Prepend an item to an array

```js
const newItem = "foo"
// a new array
return [
  newItem, // add the new item first
  ...state, // then explode the old state at the end
]
```

### Update an item in an array by index

```js
return state.map((item, index) => {
  // Replace the item at index 2
  if (index === 2) {
    return 3
  }

  // Leave every other item unchanged
  return item
})
```

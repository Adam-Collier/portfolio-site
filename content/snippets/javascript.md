## Javascript

### Chunk an array

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
```

### Parsing JSON

```js
const data = { foo: 42, bar: 1337 } // 🐌

const data = JSON.parse('{"foo":42,"bar":1337}') // 🚀
```

[The Cost of Javascript](https://v8.dev/blog/cost-of-javascript-2019#json)

### Flatten an array

```js
// This method accepts one argument to choose the depth of the flattening
const multiDimensionalArray = [
  [1, 2],
  [3, 4],
  [5, 6],
]

const flattenedArray = multiDimensionalArray.flat() // [1, 2, 3, 4, 5, 6]
```

### Remove a property from an Object

```js
const item = {
  id: 1,
  price: 50,
  image: "item.jpeg",
}

const { id, ...item2 } = item
// now item 2 doesnt have an id property
console.log(item2)
```

### Ternary alternatives

```js
return x ? x : y  => return x || y

return x ? true : false => return !!x

return x ? false : true => return !x

```

### Optional Chaining

```js
// Instead of something like
const city = user && user.address && user.address.city

// We can do
const city = user?.address?.city
```

### \$(document).ready in vanilla

```js
document.addEventListener("DOMContentLoaded", function() {
  // Handler when the DOM is fully loaded
})
```

### Get a single value from an array of objects via id

```js
myArray.find(x => x.id === "45").author
```

---
updatedOn: '2021-06-04T08:22:38.995Z'
published: true
---

## Javascript

### Chunk an array

Because sometime you just need to chunk some stuff.

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
```

### Parsing JSON

An interesting snippet I came across on [The Cost of Javascript](https://v8.dev/blog/cost-of-javascript-2019#json). I'll be using this trick the next time I'm parsing big chunks of JSON.

```js
const data = { foo: 42, bar: 1337 }; // 🐌

const data = JSON.parse('{"foo":42,"bar":1337}'); // 🚀
```

### Flatten an array

Intoduced in ES6 we can now easily flatten multi dimensional arrays. Gone are the days of having to create our own solution (taken from stackoverflow).

```js
// This method accepts one argument to choose the depth of the flattening
const multiDimensionalArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const flattenedArray = multiDimensionalArray.flat(); // [1, 2, 3, 4, 5, 6]
```

### Remove a property from an Object

A pretty neat solution, by leveraging ES6 Object destructuring assignment we can immutably remove properties.

```js
const item = {
  id: 1,
  price: 50,
  image: 'item.jpeg',
};

const { id, ...item2 } = item;
// now item 2 doesnt have an id property
console.log(item2);
```

### Optional Chaining

More than anything it's going to save you some heaps of typing, it's a neat solution for something that has plagued developers sanity for many a year.

```js
// Instead of something like
const city = user && user.address && user.address.city;

// We can do
const city = user?.address?.city;
```

### \$(document).ready in vanilla

No other excuse, I just forget what this is all the time.

```js
document.addEventListener('DOMContentLoaded', function () {
  // Handler when the DOM is fully loaded
});
```

### Get a single value from an array of objects via id

Simple, elegant and it will save you a bunch of time. No more mapping or filtering involved.

```js
myArray.find((x) => x.id === '45').author;
```

### Duplicate child elements

```js
// Child elements are usually a HTMLCollection (which we can't map over)
// So we need to convert it to an array first
Array.from(element.children).map((child) => {
  // by setting to true we grab the whole subtree too
  let clonedChild = child.cloneNode(true);
  element.appendChild(clonedChild);
});
```

### Decode HTML entities

Sometimes when using API's or text from the document special characters are encoded into HTML entities. We can take advantage of the `textarea` tag to auto decode these strings for us.

```js
export const decodeHtmlEntities = (html) => {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  let decodedHTML = textArea.value;
  textArea.remove();
  return decodedHTML;
};
```

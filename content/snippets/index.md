## React

### Add Context to a site

```jsx
// context.js

import React from "react"

const StateContext = React.createContext()
const DispatchContext = React.createContext()

// handle the reducer
const stateReducer = (state, action) => {
  switch (action.type) {
    // an example action
    case "increment": {
      return { count: state.count + 1 }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  count: 0,
}

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within a StateProvider")
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a StateProvider")
  }
  return context
}

function useContext() {
  return [useAppState(), useAppDispatch()]
}

export { StateProvider, useContext }
```

```jsx
// Any react file
import { useContext } from "../../context"

// use destructuring to make state and dispatch accessible
// count in this case is destructured from the state
const [{ count }, dispatch] = useContext()

// you could just do
const [state, dispatch] = useContext()

// then we can dispatch
dispatch({ type: "count" })

// or use the state
<div>{count}</div>
```

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

## CSS

### Line Clamp

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Device hover state

```css
@media (hover: hover) {
  .element {
    opacity: 0;
  }
  .element:hover {
    opacity: 1;
  }
}

@media (hover: none) {
  .element {
    opacity: 1;
  }
}
```

### Carousel

```css
.carousel {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel .item {
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: center;
}

/* hide horizontal scroll bar Chrome/Safari */
.carousel::-webkit-scrollbar-track,
.carousel::-webkit-scrollbar,
.carousel::-webkit-scrollbar-thumb {
  width: 0 !important;
}

.carousel {
  /* Firefox */
  scrollbar-width: none;
  /* IE */
  ms-overflow-style: none;
}
```

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

## HTML

### Details element for HTML accordion

```html
<details>
  <summary>What?</summary>
  Stay Home Stay Safe!
</details>
```

## NVM

### Install the latest version of node

```bash
$ nvm install node
```

### List versions of node installed

```bash
$ nvm list
```

### Use current node version in all terminals

```bash
$ nvm alias default node
```

## Git

### Delete local branches

When you have merged and deleted a branch on github this command will delete the local branches that dont exist remotely.

```bash
$ git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -d
```

### Add something to .gitignore

Refreshes the tracking of your files. Super useful for adding new things to your .gitignore file.

```bash
$ git rm -r --cached .
```

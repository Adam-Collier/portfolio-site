## React

### Add Context to a site

```jsx
// context.js

import React from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

// handle the reducer
const stateReducer = (state, action) => {
  switch (action.type) {
    // an example action
    case 'increment': {
      return { count: state.count + 1 };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  count: 0,
};

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a StateProvider');
  }
  return context;
}

function useContext() {
  return [useAppState(), useAppDispatch()];
}

export { StateProvider, useContext };
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

### Immutability in React

#### Update an object

```js
// state = {
//   clicks: 0,
//   count: 0
// }
return {
  ...state,
  clicks: state.clicks + 1,
  count: state.count - 1,
};
```

#### Add an item to an array

```js
const newItem = 'foo';
// a new array
return [
  ...state, // explode the old state first
  newItem, // then add the new item at the end
];
```

#### Prepend an item to an array

```js
const newItem = 'foo';
// a new array
return [
  newItem, // add the new item first
  ...state, // then explode the old state at the end
];
```

#### Update an item in an array by index

```js
return state.map((item, index) => {
  // Replace the item at index 2
  if (index === 2) {
    return 3;
  }

  // Leave every other item unchanged
  return item;
});
```

### useMediaQuery Custom Hook

Conditionally render components based on the browser size rather than rendering and hiding the components with CSS. Taken from [@cassidoo's](https://twitter.com/cassidoo) post [Building a custom React media query hook for more responsive apps](https://www.netlify.com/blog/2020/12/05/building-a-custom-react-media-query-hook-for-more-responsive-apps/?utm_source=twitter&utm_medium=usemedia-cs&utm_campaign=devex)

```js
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

// how to use it
function Page() {
  let isPageWide = useMediaQuery('(min-width: 800px)');

  return (
    <>
      {isPageWide && <UnnecessarySidebar />}
      <ImportantContent />
    </>
  );
}
```

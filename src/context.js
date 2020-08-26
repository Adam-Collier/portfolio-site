import React from "react"

const StateContext = React.createContext()
const DispatchContext = React.createContext()

// handle the reducer
const stateReducer = (state, action) => {
  switch (action.type) {
    case "isMenuVisible": {
      return { isMenuVisible: !state.isMenuVisible }
    }

    case "isMobileMenu": {
      return { isMobileMenu: !state.isMobileMenu }
    }

    case "isDarkMode": {
      let { value } = action
      localStorage.setItem("isDarkMode", value)

      value
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark")

      return { isDarkMode: value }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  isMenuVisible: false,
  isMobileMenu: false,
  isDarkMode: undefined,
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
    throw new Error("useContext must be used within a StateProvider")
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error("useContext must be used within a StateProvider")
  }
  return context
}

function useContext() {
  return [useAppState(), useAppDispatch()]
}

export { StateProvider, useContext }

import React from 'react';
import { StateProvider } from './src/context';

export const wrapRootElement = ({ element }) => (
  <StateProvider>{element}</StateProvider>
);

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem(
    'colorPreference'
  );
  const hasPersistedPreference = typeof persistedColorPreference === 'boolean';
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light';
}

const ColorPreferenceScriptTag = () => {
  const codeToRunOnClient = `
    (function() {
      ${getInitialColorMode}
      const colorPreference = getInitialColorMode();
      if(colorPreference === "dark"){
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    })()`;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColorPreferenceScriptTag key="colorPreference" />);
};

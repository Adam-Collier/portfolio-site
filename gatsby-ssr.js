import React from 'react';
import { StateProvider } from './src/context';

export const wrapRootElement = ({ element }) => (
  <StateProvider>{element}</StateProvider>
);

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('isDarkMode');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';
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
    return mql.matches ? 'true' : 'false';
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'false';
}

function ColourPreferenceScriptTag() {
  const codeToRunOnClient = `
(function() {
  ${getInitialColorMode.toString()}

  const isDarkMode = getInitialColorMode();

  isDarkMode === "true" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
})()`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColourPreferenceScriptTag />);
};

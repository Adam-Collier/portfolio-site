import React from 'react';
import { StateProvider } from './src/context';
import Layout from './src/components/Layout';

export const wrapRootElement = ({ element }) => (
  <StateProvider>{element}</StateProvider>
);

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem(
    'colorPreference'
  );
  const hasPersistedPreference = typeof persistedColorPreference === 'string';
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    localStorage.setItem('colorPreference', persistedColorPreference);
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    const preference = mql.matches ? 'dark' : 'light';
    localStorage.setItem('colorPreference', preference);
    return preference;
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  localStorage.setItem('colorPreference', 'light');
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

export const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Layout {...props}>{element}</Layout>
);

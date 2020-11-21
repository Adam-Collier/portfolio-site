/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import { StateProvider } from './src/context';

import './src/styles/prism-one-dark.css';

export const wrapRootElement = ({ element }) => (
  <StateProvider>{element}</StateProvider>
);

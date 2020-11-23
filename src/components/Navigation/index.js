import React from 'react';
import NavLink from '../NavLink';

const Index = ({ className }) => (
  <div className={className}>
    <NavLink to="/blog/">Blog</NavLink>
    <NavLink to="/snippets/">Snippets</NavLink>
    <NavLink to="/resources/">Resources</NavLink>
  </div>
);

export default Index;

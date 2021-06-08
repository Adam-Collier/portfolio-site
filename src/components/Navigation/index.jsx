import React from 'react';
import NavLink from '../NavLink';

const Navigation = ({ className }) => (
  <div className={className}>
    <NavLink href="/blog">Blog</NavLink>
    <NavLink href="/snippets">Snippets</NavLink>
    <NavLink href="/resources">Resources</NavLink>
  </div>
);

export default Navigation;

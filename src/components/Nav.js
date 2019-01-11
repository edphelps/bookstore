import React, { Component } from 'react';

/* ********************************************
*  Nav bar
*********************************************** */
const Nav = () => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Barnes and Ignoble</a>
  </nav>
);
// if exporting more than one needs to be export { func1, func2 } // NO "default" and destructure in the import import { Nav } from ''./compontents/Nav'
export default Nav

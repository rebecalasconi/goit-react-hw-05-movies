// src/components/Navbar/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
//import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav >
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Basic inline styles for the navbar
  const navStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#333',
    color: 'white',
  };

  const navListStyles = {
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    margin: 0,
    padding: 0,
  };

  const linkStyles = ({ isActive }) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    backgroundColor: isActive ? '#555' : 'transparent',
    transition: 'background-color 0.3s ease',
  });

  const brandStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  };

  return (
    <nav style={navStyles}>
      <NavLink to="/" style={brandStyles}>
        Navbar Practice
      </NavLink>
      
      <ul style={navListStyles}>
        <li>
          <NavLink to="/" style={linkStyles} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" style={linkStyles}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" style={linkStyles}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" style={linkStyles}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" style={linkStyles}>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
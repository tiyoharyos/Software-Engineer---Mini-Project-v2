import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="sidebar-link">Pokemon List</Nav.Link>
        <Nav.Link as={Link} to="/my-pokemon-list" className="sidebar-link">My Pokemon List</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;

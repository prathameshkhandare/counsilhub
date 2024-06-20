import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Make sure axios is imported

import mind_logo from '../assets/Img/mind_logo.png'; // Adjust path as per your file structure
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for client-side navigation

function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(false); // State to manage login status

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Replace '/api/check-login-status' with your actual endpoint to check login status
      const response = await axios.get('/api/check-login-status');
      const isLoggedIn = response.data.isLoggedIn;
      setLoggedIn(isLoggedIn);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-bg" style={{ minHeight: '80px' }}>
      <Navbar.Brand>
        <img
          className='Logo-img'
          src={mind_logo}
          alt="Mind Logo"
          style={{ maxHeight: '60px', width: 'auto' }} // Adjust dimensions as needed
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav-elements mb-lg-0">
          <Nav.Link as={Link} to="/" className='nav-element'>Home</Nav.Link>
          <Nav.Link as={Link} to="/aboutus" className='nav-element'>About us</Nav.Link>
          <Nav.Link as={Link} to="/contact" className='nav-element'>Contact</Nav.Link>
          <Nav.Link as={Link} to="/blog" className='nav-element'>Blog</Nav.Link>
          <Nav.Link as={Link} to="/booknow" className='nav-element'>Book Now</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <div className="right-nav-elements d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-icon">
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {loggedIn ? (
              <>
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item href='/login'>Login</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;

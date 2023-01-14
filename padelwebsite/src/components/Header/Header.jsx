import React from 'react';
import { useSelector } from "react-redux";
import { userData } from "../../containers/User/userSlice";
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';






const Header = () => {


  const navigate = useNavigate();
  const userReduxCredentials = useSelector(userData);




  if (userReduxCredentials?.credentials?.jwt !== undefined) {


    return (
      <Navbar bg="light" expand="lg">
        <div className='container-fluid'>
          <Navbar.Brand className='col-lg-3 col-md-2 homehome'>PROPADEL</Navbar.Brand>
          <Nav.Link onClick={() => navigate("/")} className='col-lg-6 col-md-8 homehome'><button className='homebutton'>Home</button></Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav col-lg-3 col-md-2" />
          <Navbar.Collapse id="basic-navbar-nav" className='align-right'>


            <div className='profilebuttonprofile' onClick={() => navigate("/profile")} >{userReduxCredentials?.credentials?.name}</div>



          </Navbar.Collapse>
        </div>
      </Navbar >

    )
  } else {


    return (
      <Navbar bg="light" expand="lg">
        <div className='container-fluid'>
          <Navbar.Brand className='col-lg-3 col-md-2 homehome'>PROPADEL</Navbar.Brand>
          <Nav.Link onClick={() => navigate("/")}className='col-lg-6 col-md-8 homehome'><button className='homebutton'>Home</button></Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav col-lg-3 col-md-2" />
          <Navbar.Collapse id="basic-navbar-nav" className='align-right'>
            <Nav className="me-auto align-right">
              <NavDropdown title="Acceso" id="basic-nav-dropdown"  >
                <NavDropdown.Item onClick={() => navigate("/login")}>Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/register")}>
                  Registro
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );


  }


}
export default Header;


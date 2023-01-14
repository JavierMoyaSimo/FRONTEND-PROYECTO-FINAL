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
            <Navbar.Brand className='col-lg-3 col-md-2'>PROPADEL</Navbar.Brand>
            <Nav.Link href="/" className='col-lg-6 col-md-8'>Home</Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav col-lg-3 col-md-2" />
            <Navbar.Collapse id="basic-navbar-nav" className='align-right'>
              <Nav className="me-auto align-right">                 
                <NavDropdown title="Acceso" id="basic-nav-dropdown"  >
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/register">
                    Registro
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
            // <div className='headerDesign container'>
            //     <div className='headerCenter col-3'>
            //         <div className='propadel'>PROPADEL</div>
            //     </div>

            //     <div className='headerLeft col-4'>
            //         <div className='titleDesign1 ' onClick={() => navigate('/')}>Home</div>
            //     </div>

            //     <div className='headerRight col-3'>
            //         <div onClick={() => navigate("/profile")} className="linkDesign">{userReduxCredentials?.credentials?.name}</div>
            //     </div>


            // </div>
        )
    } else {


        return (
            <Navbar bg="light" expand="lg">
            <div className='container-fluid'>
              <Navbar.Brand className='col-lg-3 col-md-2'>PROPADEL</Navbar.Brand>
              <Nav.Link href="/" className='col-lg-6 col-md-8'>Home</Nav.Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav col-lg-3 col-md-2" />
              <Navbar.Collapse id="basic-navbar-nav" className='align-right'>
                <Nav className="me-auto align-right">                 
                  <NavDropdown title="Acceso" id="basic-nav-dropdown"  >
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/register">
                      Registro
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        );
            // <div className='headerDesign container'>
            //     <div className='headerCenter col-3'>
            //         <div className='propadel'>PROPADEL</div>
            //     </div>

            //     <div className='headerLeft col-4'>
            //         <div className='titleDesign1' onClick={() => navigate('/')}>Home</div>
            //     </div>

            //     <div className='headerRight col-3'>
            //         <div onClick={() => navigate('/login')} className="linkDesign">Login</div>

            //         <div onClick={() => navigate('/register')} className="linkDesign">Register</div>
            //     </div>


            // </div>
        
    }


}
export default Header;


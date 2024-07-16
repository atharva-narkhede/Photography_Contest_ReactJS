// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ isAuth, isAdmin, onLogout }) => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         onLogout();
//         navigate('/');
//     };

//     return (
//         <div>
//             <style>
//                 {`
//                 @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

//                 .navbar {
//                     font-family: 'Raleway', sans-serif;
//                 }

//                 .navbar-brand,
//                 .nav-link,
//                 .btn {
//                     font-family: 'Raleway', sans-serif !important; /* Important to override default Bootstrap styles */
//                 }
//                 `}
//             </style>

//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container">
//                     <Link className="navbar-brand" to="/">Photography Contest</Link>
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>

//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav ml-auto">
//                             {isAuth || isAdmin ? (
//                                 <>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/">Home</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/contests">Contests</Link>
//                                     </li>
//                                     {isAdmin && (
//                                         <li className="nav-item">
//                                             <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
//                                         </li>
//                                     )}
//                                     <li className="nav-item">
//                                         <button className="btn btn-outline-secondary" onClick={handleLogout}>
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/login">Login</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/register">Register</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/admin-login">Admin Login</Link>
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavbarComponent = ({ isAuth, isAdmin, onLogout }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                .navbar {
                    font-family: 'Raleway', sans-serif;
                }

                .navbar-brand,
                .nav-link,
                .btn {
                    font-family: 'Raleway', sans-serif !important; /* Important to override default Bootstrap styles */
                }
                `}
            </style>

            <Navbar expanded={expanded} expand="lg" bg="light" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">Photography Contest</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {isAuth || isAdmin ? (
                                <>
                                    <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                                    <Nav.Link as={Link} to="/contests" onClick={() => setExpanded(false)}>Contests</Nav.Link>
                                    {isAdmin && (
                                        <Nav.Link as={Link} to="/admin-dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
                                    )}
                                    <Nav.Link as="button" className="btn btn-outline-secondary" onClick={() => { handleLogout(); setExpanded(false); }}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>Register</Nav.Link>
                                    <Nav.Link as={Link} to="/admin-login" onClick={() => setExpanded(false)}>Admin Login</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;

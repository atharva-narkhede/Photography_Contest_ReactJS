import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { UserAuthContext } from '../context/UserAuthContext';
import { AdminAuthContext } from '../context/AdminAuthContext';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const { isAuth: isUserAuth, user, logout: userLogout } = useContext(UserAuthContext);
    const { isAdminAuth, admin, logout: adminLogout } = useContext(AdminAuthContext);

    const handleLogout = () => {
        if (isAdminAuth) {
            adminLogout();
        } else {
            userLogout();
        }
        navigate('/');
    };

    useEffect(() => {
        // Trigger re-render if isAdminAuth changes
    }, [isAdminAuth]);

    return (
        <div>
            <Navbar expanded={expanded} expand="lg" bg="light" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">Photography Contest</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {(isUserAuth || isAdminAuth) ? (
                                <>
                                    <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                                    <Nav.Link as={Link} to="/contests" onClick={() => setExpanded(false)}>Contests</Nav.Link>
                                    {isAdminAuth && (
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

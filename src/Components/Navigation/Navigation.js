import React from "react";
import {NavLink} from "react-router-dom";

import {Navbar, Nav, Container} from "react-bootstrap";

const navigation = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Swedish</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"/>
                    <Nav>
                        <NavLink className="nav-link" exact to="/articles">
                            Articles list
                        </NavLink>
                        <NavLink className="nav-link" exact to="/">
                                Constructor
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navigation

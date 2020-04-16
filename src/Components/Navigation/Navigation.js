import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'

import {Navbar, Nav, Container} from "react-bootstrap";
import * as constructorActions from "../../store/constructor/actions";

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
                        <NavLink onClick={props.setInit} className="nav-link" exact to="/">
                                Constructor
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInit: () => dispatch(constructorActions.setInit())
    }
}

export default connect(null, mapDispatchToProps)(navigation)

import React from "react";
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

import styles from './Link.module.css'

const link = (props) => (
    <NavLink exact
             activeClassName={styles.active}
             to={props.link}>
        <Nav.Link href="#construct">
            {props.children}
        </Nav.Link>
    </NavLink>
)

export default link

import React, {Component, Fragment} from "react";

import Navigation from "../../Components/Navigation/Navigation";
import {Container} from "react-bootstrap"

import styles from './Layout.module.css'

class Layout extends Component{
    render() {
        return (
            <Fragment>
                <header>
                    <Navigation/>
                </header>
                <main>
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                <footer>

                </footer>
            </Fragment>
        );
    }
}

export default Layout

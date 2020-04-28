import React, {Component, Fragment} from "react";
import {Container} from "react-bootstrap"

import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";

import styles from './Layout.module.css'

class Layout extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <header>
                    <Navigation/>
                </header>
                <main>
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        );
    }
}

export default Layout

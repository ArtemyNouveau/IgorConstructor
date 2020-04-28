import React, {Fragment} from "react";
import {Container} from "react-bootstrap";

import styles from './Footer.module.css'

const footer = (props) => {
    const footer = [styles.FooterVisible, styles.FooterInvisible].map((style, index) => {
        return (
            <div key={index}
                 className={[styles.Footer, style].join(' ')}>
                <Container>
                    Footer
                </Container>
            </div>
        )
    })

    return footer
}

export default footer

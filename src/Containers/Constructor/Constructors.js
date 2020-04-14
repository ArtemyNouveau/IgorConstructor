import React, {Component, Fragment} from "react";
import {Col, Container, Row} from "react-bootstrap";

import InputForm from "../../Components/Form/InputForm";

class Constructor extends Component {
    state = {
        paragraphs: []
    }

    render() {
        return (
            <Row>
                <Col>
                    <InputForm/>
                </Col>
                {/*<Col>*/}
                {/*    Preview*/}
                {/*</Col>*/}
            </Row>
        );
    }
}

export default Constructor

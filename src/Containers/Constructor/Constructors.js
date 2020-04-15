import React, {Component, Fragment} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Article from "../../Components/Article/Article";

import InputForm from "../../Components/Form/InputForm";

class Constructor extends Component {

    render() {
        return (
            <Row>
                <Col>
                    <InputForm/>
                </Col>
                <Col>
                    <Article/>
                </Col>
            </Row>
        );
    }
}

export default Constructor

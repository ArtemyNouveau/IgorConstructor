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
                    <div className="d-block d-lg-none d-xl-none">
                        <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                        <Article/>
                    </div>
                </Col>
                <Col className="d-none d-lg-block d-xl-block">
                    <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                    <Article/>
                </Col>
            </Row>
        );
    }
}

export default Constructor

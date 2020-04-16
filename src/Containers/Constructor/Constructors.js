import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Article from "../../Components/Article/Article";

import InputForm from "../../Components/InputForm/InputForm";


class Constructor extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <InputForm history={this.props.history}/>
                    <div className="d-block d-lg-none d-xl-none">
                        <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                        <Article fieldset={this.props.fieldset}/>
                    </div>
                </Col>
                <Col className="d-none d-lg-block d-xl-block">
                    <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                    <Article fieldset={this.props.fieldset}/>
                </Col>
            </Row>
        );
    }
}

export default Constructor

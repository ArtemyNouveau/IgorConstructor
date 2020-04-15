import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import Article from "../../Components/Article/Article";

import InputForm from "./Form/InputForm";

class Constructor extends Component {

    render() {
        return (
            <Row>
                <Col>
                    <InputForm/>
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
const mapStateToProps = (state) => {
    return {
        fieldset: state.constructor.fields
    };
};

export default connect(mapStateToProps)(Constructor)

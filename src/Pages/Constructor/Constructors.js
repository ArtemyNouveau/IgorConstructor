import React, {Component} from "react";
import {connect} from 'react-redux'
import {Col, Row} from "react-bootstrap";
import Article from "../../Components/Article/Article";
import ArticleCard from "../../Components/Card/Card";

import InputForm from "../../Components/InputForm/InputForm";


class Constructor extends Component {
    render() {
        console.log(this.props.fieldset);
        return (
            <Row>
                <Col>
                    <InputForm history={this.props.history}
                               fieldset={this.props.fieldset}
                               card={this.props.card}
                               id={this.props.id}/>
                    <div className="d-block d-lg-none d-xl-none">
                        <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                        <ArticleCard image={this.props.card.image.imgBase64}
                                     type={this.props.card.type}
                                     text={this.props.card.text}
                                     title={this.props.card.header}/>
                        <Article fieldset={this.props.fieldset}/>
                    </div>
                </Col>
                <Col className="d-none d-lg-block d-xl-block">
                    <ArticleCard image={this.props.card.image.imgBase64}
                                 type={this.props.card.type}
                                 text={this.props.card.text}
                                 title={this.props.card.header}/>
                    <h2 style={{color: "rgba(206,212,218,0.8)"}}>Preview</h2>
                    <Article fieldset={this.props.fieldset}/>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        card: state.construct.card,
        fieldset: state.construct.fields,
        id: state.construct.id
    }
}

export default connect(mapStateToProps)(Constructor)

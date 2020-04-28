import React, {Component, Fragment} from "react";
import {connect} from 'react-redux'
import {Col, Row} from "react-bootstrap";

import Article from "../../Components/Article/Article";
import ArticleCard from "../../Components/Card/Card";
import InputForm from "../../Components/InputForm/InputForm";

import styles from './Constructor.module.css'

class Constructor extends Component {
    render() {
        const preview = (
            <Fragment>
                <h3 className={styles.PreviewHeader}>Preview card</h3>
                <ArticleCard image={this.props.card.image.imgBase64}
                             type={this.props.card.type}
                             text={this.props.card.text}
                             className={styles.Card}
                             title={this.props.card.header}/>
                <h3 className={styles.PreviewHeader}>Preview article</h3>
                <div className={styles.PreviewWrapper}>
                    <Article fieldset={this.props.fieldset}/>
                </div>
            </Fragment>
        )
        return (
            <Fragment>
                <h1 className={"text-center"}>Build your own card right now</h1>
                <Row>
                    <Col>
                        <InputForm history={this.props.history}
                                   fieldset={this.props.fieldset}
                                   card={this.props.card}
                                   id={this.props.id}
                                   cardID={this.props.cardID}/>
                        <div className="d-block d-lg-none d-xl-none">
                            {preview}
                        </div>
                    </Col>
                    <Col className="d-none d-lg-block d-xl-block">
                        {preview}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        card: state.construct.card,
        fieldset: state.construct.fields,
        id: state.construct.id,
        cardID: state.construct.cardID
    }
}

export default connect(mapStateToProps)(Constructor)

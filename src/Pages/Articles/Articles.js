import React, {Component} from "react";
import {connect} from "react-redux";
import * as articlesActions from '../../store/articles/actions'
import * as constructorActions from '../../store/constructor/actions'

import Article from "../../Components/Article/Article";
import {Accordion, Card, Button, Spinner, ButtonGroup} from "react-bootstrap";

import styles from './Article.module.css'

class Articles extends Component {
    componentDidMount() {
        this.props.fetch();
    }

    editHandler = (fields, id) => {
        this.props.setFields(fields);
        this.props.setId(id);
        this.props.history.push({
            pathname: "/",
        })
    }

    deleteHandler = (id) => {
        this.props.del(id)
    }

    render() {
        const articles = Object.keys(this.props.articles).map((key) => {
            return (
                this.props.articles[key]
            )
        })
        const IDs = Object.keys(this.props.articles);

        return (
            <div>
                <Accordion>
                    {
                        !this.props.loading ?
                            articles.map((article, index) => {
                                return (
                                    <Card key={index}>
                                        <Card.Header>
                                            <div className={styles.ArticleHeader}>
                                                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                                    {article.header.text}
                                                </Accordion.Toggle>
                                                <ButtonGroup>
                                                    <Button onClick={(event) => {
                                                        event.preventDefault();
                                                        this.editHandler(article.fields, IDs[index])
                                                    }}>edit</Button>

                                                    <Button variant="danger"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                this.deleteHandler(IDs[index])
                                                            }}>delete</Button>
                                                </ButtonGroup>
                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index}>
                                            <Card.Body>
                                                <Article fieldset={article.fields}/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            }) :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    }
                </Accordion>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => dispatch(articlesActions.fetch()),
        del: (id) => dispatch(articlesActions.del(id)),
        setFields: (fields) => dispatch(constructorActions.setFields(fields)),
        setId: (id) => dispatch(constructorActions.setId(id))
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles,
        loading: state.articles.loading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles)

import React, {Component} from "react";
import {connect} from "react-redux";
import * as articlesActions from '../../store/actions/articles'
import * as constructorActions from '../../store/actions/constructor'

import Article from "../../Components/Article/Article";
import {Accordion, Card, Button, Spinner} from "react-bootstrap";
import articles from "../../store/reducers/articles";

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
                                            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                                {article.header.text}
                                            </Accordion.Toggle>
                                            <Button onClick={(event) => {
                                                event.preventDefault();
                                                this.editHandler(article.fields, IDs[index])
                                            }}>edit</Button>
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

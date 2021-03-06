import React, {Component} from "react";
import {connect} from "react-redux";
import * as articlesActions from '../../store/articles/actions'
import * as constructorActions from '../../store/constructor/actions'

import ArticleCard from "../../Components/Card/Card";
import Article from "../../Components/Article/Article";
import {Button, Spinner, Modal} from "react-bootstrap";

import styles from './Article.module.css'

class Articles extends Component {
    state = {
        showModal: false,
        currentCard: null
    }

    componentDidMount() {
        if (this.props.cards.length === 0) this.props.fetchCards();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) || this.state.showModal !== nextState.showModal
    }

    editHandler = (fields, id) => {
        this.props.setFields(fields);
        this.props.setCard(this.props.cards[this.state.currentCard].card, this.state.currentCard)
        this.props.setId(id);
        this.props.history.push({
            pathname: "/constructor",
        })
    }

    deleteHandler = (id, articleID) => {
        this.props.del(id, articleID)
        this.setState({showModal: false, currentCard: null})
        this.props.fetchCards();
    }

    openHander = (id, articleID) => {
        console.log("open")
        this.setState({showModal: true, currentCard: id})
        this.props.fetchArticle(articleID)
    }

    render() {
        if (!this.props.cards) return null
        const cards = Object.keys(this.props.cards).map((key) => {
            return (
                this.props.cards[key]
            )
        })
        const IDs = Object.keys(this.props.cards);

        console.log(cards)

        return (
            <div>
                <h1 className={"text-center"}>List of published cards</h1>
                <div className={styles.CardsContainer}>
                    {
                        !this.props.loading ?
                            cards.map((card, index) => {
                                return (
                                    <ArticleCard key={index}
                                                 image={card.card.image.imgBase64}
                                                 text={card.card.text}
                                                 title={card.card.header}
                                                 type={card.card.type}
                                                 onClick={() => this.openHander(IDs[index], card.fieldsetID)}/>
                                )
                            }) :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    }
                </div>
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.aricleLoading ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner> :
                            <Article fieldset={this.props.article.fields}/>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.deleteHandler(this.state.currentCard, this.props.article.id)}>
                            delete
                        </Button>
                        <Button variant="primary"
                                onClick={() => this.editHandler(this.props.article.fields, this.props.article.id)}>
                            edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: () => dispatch(articlesActions.fetchCards()),
        fetchArticle: (id) => dispatch(articlesActions.fetchArticle(id)),
        del: (id, articleID) => dispatch(articlesActions.del(id, articleID)),
        setFields: (fields) => dispatch(constructorActions.setFields(fields)),
        setCard: (card, cardId) => dispatch(constructorActions.setCard(card, cardId)),
        setId: (id) => dispatch(constructorActions.setId(id))
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.articles.cards,
        article: state.articles.article,
        loading: state.articles.loading,
        aricleLoading: state.articles.articleLoading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles)

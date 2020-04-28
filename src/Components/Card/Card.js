import React, {Component} from "react";
import {Card} from "react-bootstrap";
import randomPic from "../../assets/randomPics/randomPics";

import styles from './Card.module.css'

class ArticleCard extends Component{
    state = {
        randomImage: randomPic()
    }

    render() {
        return (
            <Card className={[styles.Card, this.props.className].join(' ')} onClick={this.props.onClick}>
                <Card.Img className={styles.Img} variant="top" src={this.props.image ? this.props.image : this.state.randomImage} alt="upload image(("/>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.text}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{this.props.type}</small>
                </Card.Footer>
            </Card>
        )
    }
}

export default ArticleCard

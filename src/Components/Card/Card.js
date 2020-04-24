import React, {Fragment} from "react";
import {Card} from "react-bootstrap";
import randomPic from "../../assets/randomPics/randomPics";

const articleCard = (props) => {
    const randomImage = randomPic();
    return (
        <Card style={{}}>
            <Card.Img variant="top" src={props.image ? props.image : randomImage}/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{props.type}</small>
            </Card.Footer>
        </Card>
    )
}

export default articleCard

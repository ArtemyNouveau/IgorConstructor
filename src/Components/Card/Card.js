import React, {Fragment} from "react";
import {Card} from "react-bootstrap";

const articleCard = (props) => {
    return (
        <Card>
            <Card.Img variant="top" src={props.image}/>
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

import React from "react";
import {Form} from "react-bootstrap";

const header = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>Headline</Form.Label>
            <Form.Control type="text"
                          minLength={1}
                          required
                          value={props.text}
                          onChange={(event) => {
                              props.onInputChange(event, props.id)
                          }}
                          placeholder="Headline"/>
        </Form.Group>
    )
}

export default header

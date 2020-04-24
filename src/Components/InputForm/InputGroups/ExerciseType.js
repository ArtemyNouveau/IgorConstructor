import React from "react";
import {Form} from "react-bootstrap";

const exerciseTypes = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select"
                          value={"listening"}
                          required
                          onChange={(event) => {
                              props.onInputChange(event)
                          }}>
                <option>reading</option>
                <option>listening</option>
                <option>video</option>
                <option>test</option>
            </Form.Control>
        </Form.Group>
    )
}

export default exerciseTypes

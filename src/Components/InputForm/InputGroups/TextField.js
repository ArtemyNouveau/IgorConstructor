import React, {Fragment} from "react";
import {Form} from "react-bootstrap";
import RemoveButton from "../../UI/RemoveButton/RemoveButton";

const textField = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>text</Form.Label>
            <Form.Control as="textarea"
                          rows="1"
                          type="text"
                          minLength={1}
                          required
                          value={props.text}
                          onChange={(event) => {
                              props.onInputChange(event, props.id)
                          }}
                          placeholder="Enter text"/>
        </Form.Group>
    )
}

export default textField

import React from "react";
import {Form} from "react-bootstrap";

const image = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>Image</Form.Label>
            <Form.File label={props.imgName}
                       accept="image/*"
                       required={props.imgName === ''}
                       custom
                       onChange={(event) => {
                           props.onInputChange(event, props.id)
                       }}
            />
        </Form.Group>
    )
}

export default image

import React, {Fragment} from "react";
import {Col, Form, Row} from "react-bootstrap";
import RemoveButton from "../../UI/RemoveButton/RemoveButton";

const link = (props) => {
    return (
        <Row>
            <Col>
                <Form.Group controlId={props.id + 'text'}>
                    <Form.Label>text</Form.Label>
                    <Form.Control type="text"
                                  minlength={1}
                                  required
                                  value={props.text}
                                  onChange={(event) => {
                                      props.onInputChange(event, props.id)
                                  }}
                                  placeholder="Enter text"/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={props.id + 'URL'}>
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="url"
                                  minLength={1}
                                  required
                                  value={props.url}
                                  onChange={(event) => {
                                      props.onInputChange(event, props.id, true)
                                  }}
                                  placeholder="Enter URL"/>
                </Form.Group>
            </Col>
        </Row>
    )
}

export default link

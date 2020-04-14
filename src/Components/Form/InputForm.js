import React, {Component} from "react";

import {Form, ButtonGroup, Button, Row, Col} from "react-bootstrap";

const inputType = {
    text: 'text',
    link: 'link',
    image: 'img'
}

const text = {
    inputType: inputType.text,
    text: ''
};

class InputForm extends Component {
    state = {
        fieldset: []
    }

    onTextChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = event.target.value

        this.setState({fieldset: fields})
    }

    onLinkChange = (event, key) => {

    }

    onImageAdded = (event, key) => {

    }

    render() {
        let input;
        if (this.state.fieldset.length === 0)
            input = (
                <Form.Group controlId={0}>
                    <Form.Label>text</Form.Label>
                    <Form.Control as="textarea"
                                  rows="1"
                                  type="text"
                                  onChange={(event) => {
                                      console.log(event.target.value)
                                      this.onTextChange(event,)
                                  }}
                                  placeholder="Enter text"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            )
        else this.state.fieldset.map((field, index) => {
            switch (field.inputType) {
                case inputType.text:
                    return (
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control as="textarea"
                                          rows="1"
                                          type="text"
                                          onChange={(event) => {
                                              console.log(event.target.value)
                                              this.onTextChange(event,)
                                          }}
                                          placeholder="Enter text"/>
                        </Form.Group>
                    )
                case inputType.link:
                    return (
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Label>text</Form.Label>
                                    <Form.Control as="textarea"
                                                  rows="1"
                                                  type="text"
                                                  onChange={(event) => {
                                                      console.log(event.target.value)
                                                      this.onLinkChange(event,)
                                                  }}
                                                  placeholder="Enter text"/>
                                </Col>
                                <Col>
                                    <Form.Label>text</Form.Label>
                                    <Form.Control as="textarea"
                                                  rows="1"
                                                  type="text"
                                                  onChange={(event) => {
                                                      console.log(event.target.value)
                                                      this.onLinkChange(event,)
                                                  }}
                                                  placeholder="Enter text"/>
                                </Col>
                            </Row>
                        </Form>
                    )
                case inputType.image:
                    return (
                        <Form.File
                            id={index}
                            label="image input"
                            custom
                        />
                    )
                default:
                    return(
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control as="textarea"
                                          rows="1"
                                          type="text"
                                          onChange={(event) => {
                                              console.log(event.target.value)
                                              this.onTextChange(event,)
                                          }}
                                          placeholder="Enter text"/>
                        </Form.Group>
                    )
            }
        })

        return (
            <Form>
                {input}
                <Form.Group controlId="switchers">
                    <ButtonGroup>
                        <Button>Add Link</Button>
                        <Button>Add Image</Button>
                    </ButtonGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default InputForm

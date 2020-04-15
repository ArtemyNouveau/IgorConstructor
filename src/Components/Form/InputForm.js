import React, {Component} from "react";

import {Form, ButtonGroup, Button, Row, Col} from "react-bootstrap";
import RemoveButton from "../UI/RemoveButton/RemoveButton";

import styles from './InputForm.module.css';

const inputType = {
    text: 'text',
    link: 'link',
    image: 'img'
}

class InputForm extends Component {
    state = {
        fieldset: [
            {
                inputType: inputType.text,
                text: ''
            }
        ]
    }

    onTextChange = (event, key) => {
        key = Number(key)
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));

        fields[key] = {
            inputType: inputType.text,
            text: event.target.value
        }

        this.setState({fieldset: fields})
    }

    onLinkTextChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.link,
            text: event.target.value,
            url: this.state.fieldset[key].url
        }

        this.setState(fields)
    }

    onLinkUrlChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.link,
            url: event.target.value,
            text: this.state.fieldset[key].text
        }

        this.setState(fields)
    }

    onImageChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.image,
            img: event.target.value
        }

        this.setState({fieldset: fields})
    }

    onAddImage = () => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        if (
            fields.length > 0 &&
            fields[fields.length - 1].inputType === inputType.text &&
            fields[fields.length - 1].text === ''
        ) fields.pop()

        fields.push({
            inputType: inputType.image,
            img: '',
        })
        fields.push({
            inputType: inputType.text,
            text: ''
        })
        this.setState({fieldset: fields})
    }

    onAddLink = () => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        if (
            fields.length > 0 &&
            fields[fields.length - 1].inputType === inputType.text &&
            fields[fields.length - 1].text === ''
        ) fields.pop()

        fields.push({
            inputType: inputType.link,
            text: '',
            url: ''
        })
        fields.push({
            inputType: inputType.text,
            text: ''
        })
        this.setState({fieldset: fields})
    }

    onRemove = (key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));

        fields.splice(key, 1)

        this.setState({fieldset: fields})
    }

    render() {
        let input;
        if (this.state.fieldset.length === 0)
            input = (
                <div className={styles.InputContainer}>
                    <Form.Group controlId={0}>
                        <Form.Label>text</Form.Label>
                        <Form.Control as="textarea"
                                      rows="1"
                                      type="text"
                                      onChange={(event) => {
                                          console.log(event.target.value)
                                          this.onTextChange(event, 0)
                                      }}
                                      placeholder="Enter text"/>
                    </Form.Group>
                </div>
            )
        else input = this.state.fieldset.map((field, index) => {
            switch (field.inputType) {
                case inputType.text:
                    return (
                        <div className={styles.InputContainer}>
                            <Form.Group controlId={index}>
                                <Form.Label>text</Form.Label>
                                <Form.Control as="textarea"
                                              rows="1"
                                              type="text"
                                              onChange={(event) => {
                                                  console.log(event.target.value)
                                                  this.onTextChange(event, index)
                                              }}
                                              placeholder="Enter text"/>
                                <RemoveButton onClick={() => this.onRemove(index)}/>
                            </Form.Group>
                        </div>
                    )
                case inputType.link:
                    return (
                        <div className={styles.InputContainer}>
                            <Row>
                                <Col>
                                    <Form.Group controlId={index + 'text'}>
                                        <Form.Label>text</Form.Label>
                                        <Form.Control type="text"
                                                      onChange={(event) => {
                                                          this.onLinkTextChange(event, index)
                                                      }}
                                                      placeholder="Enter text"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={index + 'URL'}>
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control type="url"
                                                      onChange={(event) => {
                                                          this.onLinkUrlChange(event, index)
                                                      }}
                                                      placeholder="Enter text"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <RemoveButton onClick={() => this.onRemove(index)}/>
                        </div>
                    )
                case inputType.image:
                    return (
                        <div className={styles.InputContainer}>
                            <Form.File
                                id={index}
                                label="image input"
                                custom
                                onChange={(event) => {
                                    console.log(event.target.value)
                                    this.onImageChange(event, index)
                                }}
                            />
                            <RemoveButton onClick={() => this.onRemove(index)}/>
                        </div>
                    )
                default:
                    return (
                        <div>
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
                                <RemoveButton onClick={() => this.onRemove(index)}/>
                            </Form.Group>
                        </div>
                    )
            }
        })

        return (
            <Form>
                {input}
                <Form.Group controlId="switchers">
                    <ButtonGroup className="mr-auto">
                        <Button onClick={this.onAddLink}>Add Link</Button>
                        <Button onClick={this.onAddImage}>Add Image</Button>
                    </ButtonGroup>

                    <Button style={{float: 'right'}}
                            variant="primary"
                            type="submit"
                            onClick={console.log(this.state.fieldset)}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default InputForm

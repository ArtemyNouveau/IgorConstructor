import React, {Component} from "react";
import {connect} from 'react-redux'
import * as constructorActions from '../../store/actions/constructor'
import {Form, ButtonGroup, Button, Row, Col} from "react-bootstrap";
import RemoveButton from "../UI/RemoveButton/RemoveButton";

import * as inputType from '../../inputTypes'

import styles from './InputForm.module.css';

class InputForm extends Component {
    state = {
        fieldset: [
            {
                inputType: inputType.mainHeader,
                text: ''
            }
        ]
    }

    onTextChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));

        fields[key] = {
            inputType: inputType.text,
            text: event.target.value
        }

        this.setState({fieldset: fields})

        this.props.setFields(fields)
    }

    onHeaderChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));

        fields[key] = {
            inputType: inputType.header,
            text: event.target.value
        }

        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    onMainHeaderChange = (event, index) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));

        fields[index] = {
            inputType: inputType.mainHeader,
            text: event.target.value
        }

        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    onLinkTextChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.link,
            text: event.target.value,
            url: this.state.fieldset[key].url
        }

        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    onLinkUrlChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.link,
            url: event.target.value,
            text: this.state.fieldset[key].text
        }

        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    onImageChange = (event, key) => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        fields[key] = {
            inputType: inputType.image,
            img: event.target.value
        }

        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    deleteEmptyField = () => {
        let fields = JSON.parse(JSON.stringify(this.state.fieldset));
        if (
            fields.length > 0 &&
            (
                fields[fields.length - 1].inputType === inputType.text ||
                fields[fields.length - 1].inputType === inputType.header ||
                fields[fields.length - 1].inputType === inputType.link
            ) &&
            fields[fields.length - 1].text === '' ||
            fields[fields.length - 1].inputType === inputType.image &&
            fields[fields.length - 1].img === ''
        ) fields.pop()
        return fields
    }

    onAddImage = () => {
        const fields = this.deleteEmptyField()

        fields.push({
            inputType: inputType.image,
            img: '',
        })
        this.setState({fieldset: fields})
    }

    onAddLink = () => {
        const fields = this.deleteEmptyField()

        fields.push({
            inputType: inputType.link,
            text: '',
            url: ''
        })
        this.setState({fieldset: fields})
    }

    onAddGap = () => {
        const fields = this.deleteEmptyField()
        if (fields.length < 1) return

        fields.push({
            inputType: inputType.gap,
        })
        this.setState({fieldset: fields})
        this.props.setFields(fields)
    }

    onAddHeader = () => {
        const fields = this.deleteEmptyField()

        fields.push({
            inputType: inputType.header,
            text: ''
        })
        this.setState({fieldset: fields})
    }

    onAddText = () => {
        const fields = this.deleteEmptyField()

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
        this.props.setFields(fields)
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
                        <div key={index} className={styles.InputContainer}>
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
                        <div key={index} className={styles.InputContainer}>
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
                        <div key={index} className={styles.InputContainer}>
                            <Form.Group controlId={index}>
                                <Form.Label>Image</Form.Label>
                                <Form.File
                                    id={index}
                                    label="image input"
                                    custom
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.onImageChange(event, index)
                                    }}
                                />
                            </Form.Group>
                            <RemoveButton onClick={() => this.onRemove(index)}/>
                        </div>
                    )
                case inputType.header:
                    return (
                        <div key={index} className={styles.InputContainer}>
                            <Form.Group controlId={index}>
                                <Form.Label>text</Form.Label>
                                <Form.Control type="text"
                                              onChange={(event) => {
                                                  console.log(event.target.value)
                                                  this.onHeaderChange(event, index)
                                              }}
                                              placeholder="Header"/>
                                <RemoveButton onClick={() => this.onRemove(index)}/>
                            </Form.Group>
                        </div>
                    )
                case inputType.mainHeader:
                    return (
                        <div key={index} className={styles.InputContainer}>
                            <Form.Group controlId={index}>
                                <Form.Label>Main header</Form.Label>
                                <Form.Control type="text"
                                              onChange={(event) => {
                                                  this.onMainHeaderChange(event, index)
                                              }}
                                              placeholder="Header"/>
                            </Form.Group>
                        </div>
                    )
                case inputType.gap :
                    return <div key={index} className={styles.InputContainer}
                                style={{
                                    // border: '1px solid #ced4da',
                                    padding: '16px',
                                    marginBottom: '16px'
                                }}>
                        <RemoveButton onClick={() => this.onRemove(index)}/>
                    </div>
                default:
                    return (
                        <div key={index} className={styles.InputContainer}>
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
                <Form.Group style={{
                    display: 'flex',
                    alignItems: 'space-between',
                    flexWrap: 'wrap'
                }} controlId="switchers">
                    <ButtonGroup className="mr-auto" size="sm">
                        <Button onClick={this.onAddText}>Text</Button>
                        <Button onClick={this.onAddLink}>Link</Button>
                        <Button onClick={this.onAddImage}>Image</Button>
                        <Button onClick={this.onAddHeader}>Header</Button>
                        <Button onClick={this.onAddGap}>Paragraph</Button>
                    </ButtonGroup>

                    <Button variant="success"
                            type="submit"
                            size="sm"
                            onClick={console.log(this.state.fieldset)}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFields: (fields) => dispatch(constructorActions.setFields(fields))
    }
};

const mapStateToProps = (state) => {
    return {
        fieldset: state.constructor.fields
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)

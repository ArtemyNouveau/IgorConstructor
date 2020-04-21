import React, {Component} from "react";
import {connect} from 'react-redux'
import * as constructorActions from '../../store/constructor/actions'
import {Form, ButtonGroup, Button, Row, Col} from "react-bootstrap";
import RemoveButton from "../UI/RemoveButton/RemoveButton";

import * as inputType from '../../inputTypes'

import styles from './InputForm.module.css';

const inputForm = (props) => {
    const onInputChange = (event, key, isURL = false) => {
        let fields = JSON.parse(JSON.stringify(props.fieldset));

        switch (fields[key].inputType) {
            case inputType.text:
                fields[key] = {
                    inputType: inputType.text,
                    text: event.target.value
                };
                break;
            case inputType.link:
                if (isURL)
                    fields[key] = {
                        inputType: inputType.link,
                        url: event.target.value,
                        text: props.fieldset[key].text
                    }
                else
                    fields[key] = {
                        inputType: inputType.link,
                        text: event.target.value,
                        url: props.fieldset[key].url
                    }
                break;
            case inputType.header:
                fields[key] = {
                    inputType: inputType.header,
                    text: event.target.value
                }
                break;
            case inputType.mainHeader:
                fields[key] = {
                    inputType: inputType.mainHeader,
                    text: event.target.value
                }
                break;
            case inputType.image:
                fields[key] = {
                    inputType: inputType.image,
                    img: event.target.value
                }
                break;
            default:
                fields[key] = {
                    inputType: inputType.text,
                    text: event.target.value
                };
        }

        props.setFields(fields)
    }

    const clearedFields = () => {
        let fields = JSON.parse(JSON.stringify(props.fieldset));
        if (
            fields.length > 0 &&
            (
                fields[fields.length - 1].inputType === inputType.text ||
                fields[fields.length - 1].inputType === inputType.header ||
                fields[fields.length - 1].inputType === inputType.link
            ) &&
            fields[fields.length - 1].text === ''

        ) fields.pop()
        else if (
            fields[fields.length - 1].inputType === inputType.image &&
            fields[fields.length - 1].img === ''
        ) fields.pop()
        return fields
    }

    const onAdd = (type) => {
        let fields = clearedFields();

        switch (type) {
            case inputType.text:
                fields.push({
                    inputType: inputType.text,
                    text: ''
                })
                break;
            case inputType.link:
                fields.push({
                    inputType: inputType.link,
                    text: '',
                    url: ''
                })
                break;
            case inputType.image:
                fields.push({
                    inputType: inputType.image,
                    img: '',
                })
                break;
            case inputType.header:
                fields.push({
                    inputType: inputType.header,
                    text: ''
                })
                break;
            case inputType.gap:
                fields.push({
                    inputType: inputType.gap,
                })
                break
            default:
                fields.push({
                    inputType: inputType.gap,
                })
        }

        props.setFields(fields)
    }

    const onRemove = (key) => {
        let fields = JSON.parse(JSON.stringify(props.fieldset));

        fields.splice(key, 1)

        props.setFields(fields)
    }

    const updateArticle = () => {
        props.update(props.fieldset, props.fieldset[0], props.id)
        props.history.push({
            pathname: "/articles",
        })
    }

    const saveArticle = () => {
        props.save(props.fieldset, props.fieldset[0])
        props.history.push({
            pathname: "/articles",
        })
    }

    let input;
    if (!!!props.fieldset)
        input = (
            <div className={styles.InputContainer}>
                <Form.Group controlId={0}>
                    <Form.Label>text</Form.Label>
                    <Form.Control as="textarea"
                                  rows="1"
                                  type="text"
                                  onChange={(event) => {
                                      console.log(event.target.value)
                                      onInputChange(event, 0)
                                  }}
                                  placeholder="Enter text"/>
                </Form.Group>
            </div>
        )
    else input = props.fieldset.map((field, index) => {
        switch (field.inputType) {
            case inputType.text:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control as="textarea"
                                          rows="1"
                                          type="text"
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Enter text"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
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
                                                  value={props.fieldset[index].text}
                                                  onChange={(event) => {
                                                      onInputChange(event, index)
                                                  }}
                                                  placeholder="Enter text"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={index + 'URL'}>
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control type="url"
                                                  value={props.fieldset[index].url}
                                                  onChange={(event) => {
                                                      onInputChange(event, index, true)
                                                  }}
                                                  placeholder="Enter text"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <RemoveButton onClick={() => onRemove(index)}/>
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
                                    onInputChange(event, index)
                                }}
                            />
                        </Form.Group>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                )
            case inputType.header:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control type="text"
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Header"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
                        </Form.Group>
                    </div>
                )
            case inputType.mainHeader:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>Main header</Form.Label>
                            <Form.Control type="text"
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Header"/>
                        </Form.Group>
                    </div>
                )
            case inputType.gap :
                return <div key={index} className={styles.InputContainer}
                            style={{
                                padding: '16px',
                                marginBottom: '16px'
                            }}>
                    <RemoveButton onClick={() => onRemove(index)}/>
                </div>
            default:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control as="textarea"
                                          rows="1"
                                          type="text"
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              console.log(event.target.value)
                                              onInputChange(event,)
                                          }}
                                          placeholder="Enter text"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
                        </Form.Group>
                    </div>
                )
        }
    })

    return (
        <Form>
            {input}
            <Form.Group className={styles.ButtonGroup}
                        controlId="switchers">
                <ButtonGroup className="mr-auto" size="sm">
                    <Button onClick={() => onAdd(inputType.text)}>
                        Text
                    </Button>
                    <Button onClick={() => onAdd(inputType.link)}>
                        Link
                    </Button>
                    <Button onClick={() => onAdd(inputType.image)}>
                        Image
                    </Button>
                    <Button onClick={() => onAdd(inputType.header)}>
                        Header
                    </Button>
                    <Button onClick={() => onAdd(inputType.gap)}>
                        Paragraph
                    </Button>
                </ButtonGroup>

                {props.id ?
                    <Button variant="success"
                            type="submit"
                            size="sm"
                            onClick={(event) => {
                                event.preventDefault()
                                updateArticle()
                            }}>
                        update
                    </Button> :
                    <Button variant="success"
                            type="submit"
                            size="sm"
                            onClick={(event) => {
                                event.preventDefault()
                                saveArticle()
                            }}>
                        Save
                    </Button>
                }
            </Form.Group>
        </Form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFields: (fields) => dispatch(constructorActions.setFields(fields)),
        save: (fields, articleHeader) => dispatch(constructorActions.saveFields(fields, articleHeader)),
        update: (fields, articleHeader, id) => dispatch(constructorActions.updateFields(fields, articleHeader, id))
    }
};

const mapStateToProps = (state) => {
    return {
        fieldset: state.constructor.fields,
        id: state.constructor.id
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(inputForm)

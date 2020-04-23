import React from "react";
import {connect} from 'react-redux'
import * as constructorActions from '../../store/constructor/actions'
import {Form, ButtonGroup, Button, Row, Col} from "react-bootstrap";
import RemoveButton from "../UI/RemoveButton/RemoveButton";

import * as inputType from '../../inputTypes'

import styles from './InputForm.module.css';

const inputForm = (props) => {
    //TODO validation https://react-bootstrap.github.io/components/forms/#forms-validation

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false)
            return;
        if (props.id)
            updateArticle()
        else
            saveArticle()

        console.log(form.checkValidity())
    };

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
                    };
                else
                    fields[key] = {
                        inputType: inputType.link,
                        text: event.target.value,
                        url: props.fieldset[key].url
                    };
                break;
            case inputType.header:
                fields[key] = {
                    inputType: inputType.header,
                    text: event.target.value
                };
                break;
            case inputType.mainHeader:
                fields[key] = {
                    inputType: inputType.mainHeader,
                    text: event.target.value
                };
                break;
            case inputType.mainImage: {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = function () {
                    fields[key] = {
                        inputType: inputType.mainImage,
                        imgBase64: reader.result,
                        imgName: file.name,
                        imgType: file.type
                    }
                    props.setFields(fields)
                }
                reader.readAsDataURL(file);
                break;
            }
            case inputType.image: {
                let file = event.target.files[0];
                // if (file.type)
                let reader = new FileReader();
                reader.onloadend = function () {
                    fields[key] = {
                        inputType: inputType.image,
                        imgBase64: reader.result,
                        imgName: file.name,
                        imgType: file.type
                    }
                    props.setFields(fields)
                }
                reader.readAsDataURL(file);
                break;
            }
            default:
                fields[key] = {
                    inputType: inputType.text,
                    text: event.target.value
                };
        }

        props.setFields(fields)
    };

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

        ) fields.pop();
        else if (
            fields[fields.length - 1].inputType === inputType.image &&
            fields[fields.length - 1].img === ''
        ) fields.pop();
        return fields
    };

    const onAdd = (type) => {
        let fields = clearedFields();

        switch (type) {
            case inputType.text:
                fields.push({
                    inputType: inputType.text,
                    text: ''
                });
                break;
            case inputType.link:
                fields.push({
                    inputType: inputType.link,
                    text: '',
                    url: ''
                });
                break;
            case inputType.image:
                fields.push({
                    inputType: inputType.image,
                    imgBase64: '',
                    imgName: '',
                    imgType: ''
                });
                break;
            case inputType.header:
                fields.push({
                    inputType: inputType.header,
                    text: ''
                });
                break;
            case inputType.gap:
                fields.push({
                    inputType: inputType.gap,
                });
                break;
            default:
                fields.push({
                    inputType: inputType.gap,
                })
        }

        props.setFields(fields)
    };

    const onRemove = (key) => {
        let fields = JSON.parse(JSON.stringify(props.fieldset));

        fields.splice(key, 1);

        props.setFields(fields)
    };

    const updateArticle = () => {
        props.update(props.fieldset, props.fieldset[0], props.fieldset[1], props.id)
        props.history.push({
            pathname: "/articles",
        })
    };

    const saveArticle = () => {

        props.save(props.fieldset, props.fieldset[0], props.fieldset[1])
        props.history.push({
            pathname: "/articles",
        })
    };


    let input;
    if (!props.fieldset)
        input = (
            <div className={styles.InputContainer}>
                <Form.Group controlId={0}>
                    <Form.Label>text</Form.Label>
                    <Form.Control as="textarea"
                                  rows="1"
                                  type="text"
                                  minlength={1}
                                  required
                                  onChange={(event) => {
                                      console.log(event.target.value);
                                      onInputChange(event, 0)
                                  }}
                                  placeholder="Enter text"/>
                </Form.Group>
            </div>
        );
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
                                          minlength={1}
                                          required
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Enter text"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
                        </Form.Group>
                    </div>
                );
            case inputType.link:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Row>
                            <Col>
                                <Form.Group controlId={index + 'text'}>
                                    <Form.Label>text</Form.Label>
                                    <Form.Control type="text"
                                                  minlength={1}
                                                  required
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
                                                  minlength={1}
                                                  required
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
                );
            case inputType.image:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>Image</Form.Label>
                            <Form.File label={props.fieldset[index].imgName}
                                       accept="image/*"
                                       required={props.fieldset[index].imgName === ''}
                                       custom
                                       onChange={(event) => {
                                           onInputChange(event, index)
                                       }}
                            />
                        </Form.Group>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                );
            case inputType.header:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control type="text"
                                          minlength={1}
                                          required
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Header"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
                        </Form.Group>
                    </div>
                );
            case inputType.mainHeader:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>Main header</Form.Label>
                            <Form.Control type="text"
                                          minlength={1}
                                          required
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              onInputChange(event, index)
                                          }}
                                          placeholder="Header"/>
                        </Form.Group>
                    </div>

                )
            case inputType.mainImage:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>Preview image</Form.Label>
                            <Form.File label={props.fieldset[index].imgName}
                                       accept="image/*"
                                       required={props.fieldset[index].imgName === ''}
                                       custom
                                       onChange={(event) => {
                                           onInputChange(event, index)
                                       }}
                            />
                        </Form.Group>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                )
            case inputType.gap :
                return <div key={index} className={styles.InputContainer}
                            style={{
                                padding: '16px',
                                marginBottom: '16px'
                            }}>
                    <RemoveButton onClick={() => onRemove(index)}/>
                </div>;
            default:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Form.Group controlId={index}>
                            <Form.Label>text</Form.Label>
                            <Form.Control as="textarea"
                                          rows="1"
                                          type="text"
                                          minlength={1}
                                          required
                                          value={props.fieldset[index].text}
                                          onChange={(event) => {
                                              console.log(event.target.value);
                                              onInputChange(event,)
                                          }}
                                          placeholder="Enter text"/>
                            <RemoveButton onClick={() => onRemove(index)}/>
                        </Form.Group>
                    </div>
                )
        }
    });

    return (
        <Form noValidate validated={true} onSubmit={handleSubmit}>
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
                            size="sm">
                        update
                    </Button> :
                    <Button variant="success"
                            type="submit"
                            size="sm">
                        Save
                    </Button>
                }
            </Form.Group>
        </Form>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFields: (fields) => dispatch(constructorActions.setFields(fields)),
        save: (fields, articleHeader, articleBanner) => dispatch(constructorActions.saveFields(fields, articleHeader, articleBanner)),
        update: (fields, articleHeader, articleBanner, id) => dispatch(constructorActions.updateFields(fields, articleHeader, articleBanner, id))
    }
};

export default connect(null, mapDispatchToProps)(inputForm)

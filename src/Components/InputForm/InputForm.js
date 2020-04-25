import React from "react";
import {connect} from 'react-redux'
import * as constructorActions from '../../store/constructor/actions'
import {Form, ButtonGroup, Button} from "react-bootstrap";

import RemoveButton from "../UI/RemoveButton/RemoveButton";
import TextField from "./InputGroups/TextField";
import Link from "./InputGroups/Link";
import Image from "./InputGroups/Image";
import Header from "./InputGroups/Header";
import ExerciseTypes from "./InputGroups/ExerciseType";

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

    const onCardHeaderChange = (event) => {
        const card = JSON.parse(JSON.stringify(props.card));
        card.header = event.target.value
        props.setCard(card)
    }

    const onCardImageChange = (event) => {
        const card = JSON.parse(JSON.stringify(props.card));
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            card.image.imgBase64 = reader.result;
            card.image.imgName = file.name;
            props.setCard(card)
        }
        reader.readAsDataURL(file);
    }

    const onCardTextChange = (event) => {
        const card = JSON.parse(JSON.stringify(props.card));
        card.text = event.target.value
        props.setCard(card)
    }

    const onCardTypeChange = (event) => {
        const card = JSON.parse(JSON.stringify(props.card));
        card.type = event.target.value
        props.setCard(card)
        console.log(card.header)
    }

    const onInputChange = (event, key, isURL = false) => {
        const fields = JSON.parse(JSON.stringify(props.fieldset));

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
            case inputType.cardHeader:
                fields[key] = {
                    inputType: inputType.cardHeader,
                    text: event.target.value
                };
                break;
            case inputType.cardImage: {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = function () {
                    fields[key] = {
                        inputType: inputType.cardImage,
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
        const fields = JSON.parse(JSON.stringify(props.fieldset));
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

        props.save(props.fieldset, props.card)
        props.history.push({
            pathname: "/articles",
        })
    };


    let input = props.fieldset.map((field, index) => {
        switch (field.inputType) {
            case inputType.text:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <TextField id={index}
                                   text={props.fieldset[index].text}
                                   onInputChange={onInputChange}/>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                );
            case inputType.link:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Link id={index}
                              text={props.fieldset[index].text}
                              url={props.fieldset[index].url}
                              onInputChange={onInputChange}/>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                );
            case inputType.image:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Image id={index}
                               imgName={props.fieldset[index].imgName}
                               onInputChange={onInputChange}/>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                );
            case inputType.header:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Header id={index}
                                text={props.fieldset[index].text}
                                onInputChange={onInputChange}/>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                );
            case inputType.gap :
                return (
                    <div key={index} className={[styles.InputContainer, styles.GapBlock].join(' ')}>
                        <RemoveButton onClick={() => onRemove(index)}/>
                    </div>
                )
            case inputType.cardHeader:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Header id={index}
                                text={props.card.header}
                                onInputChange={onCardHeaderChange}/>
                    </div>
                )
            case inputType.cardText:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <TextField id={index}
                                   text={props.card.text}
                                   onInputChange={onCardTextChange}/>
                    </div>
                )
            case inputType.cardImage:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <Image id={index}
                               imgName={props.card.image.imgName}
                               onInputChange={onCardImageChange}/>
                    </div>
                )
            case inputType.exerciseType:
                return (
                    <div key={index} className={styles.InputContainer}>
                        <ExerciseTypes id={index}
                                       value={props.card.type}
                                       onInputChange={onCardTypeChange}/>
                    </div>
                )
            default:
                return (
                    <div key={index} className={[styles.InputContainer, styles.GapBlock].join(' ')}>
                        <RemoveButton onClick={() => onRemove(index)}/>
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
        setCard: (card) => dispatch(constructorActions.setCard(card)),
        save: (fields, card) => dispatch(constructorActions.saveFields(fields, card)),
        update: (fields, articleHeader, articleBanner, id) => dispatch(constructorActions.updateFields(fields, articleHeader, articleBanner, id))
    }
};

export default connect(null, mapDispatchToProps)(inputForm)

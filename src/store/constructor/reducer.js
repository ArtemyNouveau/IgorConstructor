import actionTypes from './actionTypes'
import {updateObject} from "../Utility";
import * as inputType from "../../inputTypes";

const initialState = {
    card: {
        header: 'Sample card title',
        text: 'Short, yet descriptive text',
        image: {
            imgBase64: '',
            imgName: '',
        },
        type: 'listening',
    },
    cardID: null,
    fields: [
        {
            inputType: inputType.cardHeader,
            text: ''
        },
        {
            inputType: inputType.cardImage,
            imgBase64: '',
            imgName: '',
            imgType: ''
        },
        {
            inputType: inputType.cardText,
            text: ''
        },
        {
            inputType: inputType.exerciseType,
            text: ''
        },
        {
            inputType: inputType.header,
            text: 'Start typing something!'
        },
        {
            inputType: inputType.text,
            text: "Don't forget about buttons below"
        }
    ],
    loading: false,
    id: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_FIELDS:
            return updateObject(state, {fields: action.fieldset});
        case actionTypes.ADD_FIELD:
            return updateObject(state, {fields: state.fields.concat(action.field)});
        case actionTypes.SET_ID:
            return updateObject(state, {id: action.id});
        case actionTypes.SET_CARD:
            return updateObject(state, {card: action.card, cardID: action.id});
        default:
            return initialState
    }
}

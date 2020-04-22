import actionTypes from './actionTypes'
import {updateObject} from "../Utility";
import * as inputType from "../../inputTypes";

const initialState = {
    fields: [
        {
            inputType: inputType.mainHeader,
            text: ''
        },
        {
            inputType: inputType.mainImage,
            imgBase64: '',
            imgName: '',
            imgType: ''
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
        case actionTypes.INITIALIZE:
            return initialState;
        default:
            return state
    }
}

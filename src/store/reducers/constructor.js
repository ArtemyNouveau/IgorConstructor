import * as actionTypes from '../actions/ActionTypes'
import {updateObject} from "../Utility";

const initialState = {
    fields: [],
    loading: false
}

const constructor = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FIELDS:
            return updateObject(state, {fields: action.fieldset})
        case actionTypes.ADD_FIELD:
            return updateObject(state, {fields: state.fields.concat(action.field)})
        default:
            return state
    }
}

export default constructor

import * as actionTypes from './ActionTypes'

export const addField = (field) => {
    return {
        type: actionTypes.ADD_FIELD,
        field: field
    }
}

export const setFields = (fieldset) => {
    return {
        type: actionTypes.SET_FIELDS,
        fieldset: fieldset
    }
}

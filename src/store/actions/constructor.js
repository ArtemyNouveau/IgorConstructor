import * as actionTypes from './ActionTypes'
import axiosInstance from "../../axiosInstance";

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

export const saveSuccess = (data) => {
    return {
        type: actionTypes.SAVE_SUCCESS
    }
}

export const saveFail = (error) => {
    return {
        type: actionTypes.SAVE_FAIL,
        error: error
    }
}

export const saveFields = (fieldset, articleHeader) => {
    return dispatch => {
        axiosInstance.post('/articles.json', {fields: fieldset, header: articleHeader})
            .then((response) => {
                console.log(response.data)
                dispatch(saveSuccess(response.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(saveFail(err))
            })
    }
}

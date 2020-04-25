import actionTypes from './actionTypes'
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

export const setCard = (card) => {
    return {
        type: actionTypes.SET_CARD,
        card: card
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

export const saveFields = (fieldset, card) => {
    return dispatch => {
        axiosInstance.post('/articles.json', {fields: fieldset})
            .then((response) => {
                console.log(response.data.name)
                axiosInstance.post('/cards.json', {card: card, fieldsetID: response.data.name})
                    .then((response) => {
                        console.log(response.data.name)
                        dispatch(saveSuccess(response.data))
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch(saveFail(err))
                    })
            })
            .catch((err) => {
                console.log(err)
                dispatch(saveFail(err))
            })
    }
}

export const setId = (id) => {
    return {
        type: actionTypes.SET_ID,
        id: id
    }
}

export const setInit = () => {
    return {
        type: actionTypes.INITIALIZE,
    }
}

export const updateFields = (fieldset, articleHeader, articleBanner, id) => {
    return dispatch => {
        axiosInstance.put(`/articles/${id}.json`, {fields: fieldset, header: articleHeader, articleBanner: articleBanner})
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

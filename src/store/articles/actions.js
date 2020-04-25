import actionTypes from './actionTypes'
import axiosInstance from "../../axiosInstance";

export const setCards = (cards) => {
    return {
        type: actionTypes.SET_CARDS,
        cards: cards
    }
}

export const setArticle = (article, id) => {
    return {
        type: actionTypes.SET_ARTICLE,
        fields: article.fields,
        id: id
    }
};

export const deleteSuccess = () => {
    console.log("deleted")
    return {}
}

export const fetchFailed = (err) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: err
    }
};

export const fetchArticle = (articleID) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_ARTICLE})
        axiosInstance.get(`/articles/${articleID}.json`).then((response) => {
            console.log(response)
            dispatch(setArticle(response.data, articleID))
        }).catch((err) => {
            console.log(err)
            dispatch(fetchFailed(err))
        })
    }
}

export const fetchCards = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_CARD})
        axiosInstance.get('/cards.json').then((response) => {
            dispatch(setCards(response.data))
        }).catch((err) => {
            console.log(err)
            dispatch(fetchFailed(err))
        })
    }
};

export const del = (id, articleID) => {
    return (dispatch) => {
        axiosInstance.delete(`/articles/${articleID}.json`)
            .then(response => {
                return axiosInstance.delete(`/cards/${id}.json`)
            })
            .then((response) => {
                dispatch(deleteSuccess())
            })
            .catch((err) => {
                console.log(err)
                dispatch(fetchFailed(err))
            })
    }
}

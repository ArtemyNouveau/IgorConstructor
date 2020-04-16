import * as actionTypes from "../actions/ActionTypes";
import {updateObject} from "../Utility";

const initialState = {
    articles: [],
    loading: true
}

const articles = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUCCESS:
            return updateObject(state, {
                articles: action.articles,
                loading: false
            })
        case actionTypes.FETCH_FAIL:
            return updateObject(state, {loading: false})
        default:
            return state
    }
}

export default articles

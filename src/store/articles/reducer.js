import actionTypes from "./actionTypes";
import {updateObject} from "../Utility";

const initialState = {
    article: {
        fields: null,
        id: null
    },
    cards: [],
    loading: true,
    articleLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CARDS:
            return updateObject(state, {
                cards: action.cards,
                loading: false
            });
        case actionTypes.FETCH_ARTICLE:
            return updateObject(state, {articleLoading: true})
        case actionTypes.FETCH_CARD:
            return updateObject(state, {loading: true})
        case actionTypes.SET_ARTICLE:
            return updateObject(state, {
                article: {
                    fields: action.fields,
                    id: action.id
                },
                articleLoading: false
            })
        case actionTypes.FETCH_FAIL:
            return updateObject(state, {
                loading: false,
                articleLoading: false
            });
        default:
            return state
    }
}

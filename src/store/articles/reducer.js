import actionTypes from "./actionTypes";
import {updateObject} from "../Utility";

const initialState = {
    articles: [],
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SUCCESS:
            return updateObject(state, {
                articles: action.articles,
                loading: false
            });
        case actionTypes.FETCH_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state
    }
}

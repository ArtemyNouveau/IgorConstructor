import { combineReducers } from 'redux';
import articles from './articles/reducer';
import constructor from './constructor/reducer';
const appReducer = combineReducers({articles, constructor})
const rootReducer = (state, actionValue) => appReducer(state, actionValue);

export default rootReducer;
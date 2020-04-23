import { combineReducers } from 'redux';
import articles from './articles/reducer';
import construct from './constructor/reducer';

const appReducer = combineReducers({articles, construct})
const rootReducer = (state, actionValue) => appReducer(state, actionValue);

export default rootReducer;

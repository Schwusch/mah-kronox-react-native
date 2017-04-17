import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import { createEpicMiddleware } from 'redux-observable';
import { fetchAutocompleteEpic } from '../actions/autocomplete';

const epicMiddleware = createEpicMiddleware(fetchAutocompleteEpic);
const middleware = applyMiddleware(epicMiddleware, thunk, promise(), logger);

export default store = createStore(reducers, {}, middleware);

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(thunk, promise(), logger);

export default store = createStore(reducers, {}, middleware);

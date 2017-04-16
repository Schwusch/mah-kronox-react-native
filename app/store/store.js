import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";

const logger = createLogger({
  colors: false
});

const middleware = applyMiddleware(thunk, promise(), logger);

export default store = createStore(reducers, {}, middleware);

import { compose, applyMiddleware, createStore } from 'redux';
import {AsyncStorage} from 'react-native'
//import logger from 'redux-logger';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { fetchAutocompleteEpic } from '../actions/autocomplete';
import { fetchSignatureEpic } from '../actions/fetchSignatures';
import {persistStore, autoRehydrate} from 'redux-persist';

const rootEpic = combineEpics(
  fetchAutocompleteEpic,
  fetchSignatureEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = applyMiddleware(
  epicMiddleware,
  thunk,
  promise(),
  //logger
);

export default store = createStore(reducers, {}, compose(middleware, autoRehydrate()));

persistStore(store, {
  storage: AsyncStorage,
  blacklist:["routes", "autocomplete"]
})

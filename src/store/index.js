import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import logger from '../middleware/reduxLogger';
import makeRootReducer from './reducers';
import { initialState as commonInitialState } from './common/reducer';
import history from './history';

import fetch from '../middleware/fetch';

const rootStore = () => {
  const middleware = [routerMiddleware(history), thunk, fetch, logger];
  const enhancers = [];

  if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const initialState = {
    common: commonInitialState
  };

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  store.asyncReducers = {};

  return store;
};

export default rootStore();

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './common/reducer';
import history from './history';

const makeRootReducer = asyncReducers => {
  return combineReducers({
    ...asyncReducers,
    common,
    // routing
    router: connectRouter(history)
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;

  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

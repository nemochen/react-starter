import { ACTION_TYPES } from './action';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTION_TYPES.INDEX_ADD_COUNT]: (state, action) => ({
    ...state,
    count: action.data.count
  })
};

const initialState = {
  count: 0
};

// ------------------------------------
// Reducer
// ------------------------------------
const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default reducer;

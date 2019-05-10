import { ACTION_TYPES } from './action';

const initialState = {
  requestingRate: false,
  rate: {
    BTC: '-',
    CNY: '-',
    EOS: '-',
    ETH: '-',
    HKD: '-',
    USD: '-',
    USDT: '-'
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTION_TYPES.COMMON_RATE]: (state, action) => {
    const newState = { ...state };

    newState.requestingRate = false;
    newState.rate = action.data;
    return newState;
  },
  [`REQUESTING_${ACTION_TYPES.COMMON_RATE}`]: state => {
    const newState = { ...state };

    newState.requestingRate = true;
    return newState;
  },
  [`FAIL_${ACTION_TYPES.COMMON_RATE}`]: state => {
    const newState = { ...state };

    newState.requestingRate = false;
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default reducer;

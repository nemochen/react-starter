import { ACTION_TYPES } from './action';

export const initialState = {
  // header 显示
  headerVisible: true,
  // footer 显示
  footerVisible: true
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case ACTION_TYPES.COMMON_SET_HEADER_VISIBLE:
      newState.headerVisible = action.data.visible;
      break;
    case ACTION_TYPES.COMMON_SET_FOOTER_VISIBLE:
      newState.footerVisible = action.data.visible;
      break;
    default:
      break;
  }

  return { ...newState };
};

export default reducer;

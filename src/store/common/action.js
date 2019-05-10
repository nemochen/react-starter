import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  COMMON_SET_HEADER_VISIBLE: null,
  COMMON_SET_FOOTER_VISIBLE: null
});

export const setHeaderVisible = visible => {
  return {
    type: ACTION_TYPES.COMMON_SET_HEADER_VISIBLE,
    data: { visible }
  };
};

export const setFooterVisible = visible => {
  return {
    type: ACTION_TYPES.COMMON_SET_FOOTER_VISIBLE,
    data: { visible }
  };
};

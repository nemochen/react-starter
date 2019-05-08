import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  INDEX_ADD_COUNT: null
});

export const testReducer = (count = 1) => {
  return {
    type: ACTION_TYPES.INDEX_ADD_COUNT,
    data: { count }
  };
};

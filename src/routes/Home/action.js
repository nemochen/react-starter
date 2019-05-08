import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  HOME_ADD_COUNT: null
});

export const testReducer = (count = 1) => {
  return {
    type: ACTION_TYPES.HOME_ADD_COUNT,
    data: { count }
  };
};

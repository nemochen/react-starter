import keyMirror from 'keymirror';
import { CALL_API } from '../../middleware/fetch';
import API from '../../middleware/apis';

export const ACTION_TYPES = keyMirror({
  COMMON_RATE: null
});

export const getRate = () => {
  return {
    [CALL_API]: {
      type: ACTION_TYPES.COMMON_RATE,
      url: API.COMMON_GET_RATE,
      method: 'GET'
    }
  };
};

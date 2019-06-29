import {BUSINESSES_RECEIVED} from '../constants/index';
const businessesReducer = (state = {}, action) => {
  switch (action.type) {
    case BUSINESSES_RECEIVED:
      return action.payload;
    default:
      return state;
  }
};

export { businessesReducer };

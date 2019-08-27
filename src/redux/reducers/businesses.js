import { BUSINESSES_RECEIVED } from '../constants/index';

const businessesReducer = (state = [], action) => {
  switch (action.type) {
    case BUSINESSES_RECEIVED:
      const stateNew = action.payload;
      return stateNew;
      // return Object.assign([], state, action.payload);
    default:
      return state;
  }
};

export { businessesReducer };

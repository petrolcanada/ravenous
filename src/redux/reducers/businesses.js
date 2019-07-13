import { BUSINESSES_RECEIVED } from '../constants/index';
import { Yelp } from '../../util/Yelp';

const businessesReducer = (state = [], action) => {
  switch (action.type) {
    case BUSINESSES_RECEIVED:
      return Object.assign([],action.payload);
    default:
      return state;
  }
};

export { businessesReducer };

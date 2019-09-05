import { UPDATE_TIMES } from '../constants';

const initialState = 0;

const timesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TIMES:
            const newTimes = action.payload;
            return newTimes;
        default:
            return state;
    }
}
export { timesReducer };
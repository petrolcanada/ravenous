import { SEARCH_PARAMS_FROM_KAFKA } from '../constants/index';

const searchParamsFromKafkaReducer = (state = [], action) => {
    switch (action.type) {
        case SEARCH_PARAMS_FROM_KAFKA:
            const stateNew = state.concat(action.payload);
            return stateNew;
        default:
            return state;
    };
};
export { searchParamsFromKafkaReducer };
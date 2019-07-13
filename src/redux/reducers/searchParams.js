import { UPDATE_SEARCH_PARAMS } from "../constants";

const initialState = {
    term: "",
    location: "",
    sortBy: "best_match"
};

const searchParamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_PARAMS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    };
};

export { searchParamsReducer };
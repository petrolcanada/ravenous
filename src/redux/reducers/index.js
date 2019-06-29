import { businessesReducer } from "./businesses";
import { searchParamsReducer } from "./searchParams";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  businessesReducer: businessesReducer,
  searchParamsReducer: searchParamsReducer
});

export default allReducers;

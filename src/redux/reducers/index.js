import { businessesReducer } from "./businesses";
import { searchParamsReducer } from "./searchParams";
import { searchParamsFromKafkaReducer } from './searchParamsFromKafka';
import { timesReducer } from './times';
import { combineReducers } from "redux";

const allReducers = combineReducers({
  businessesReducer: businessesReducer,
  searchParamsReducer: searchParamsReducer,
  searchParamsFromKafkaReducer: searchParamsFromKafkaReducer,
  timesReducer: timesReducer
});

export default allReducers;

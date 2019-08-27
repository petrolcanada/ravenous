import { businessesReducer } from "./businesses";
import { searchParamsReducer } from "./searchParams";
import { searchParamsFromKafkaReducer } from './searchParamsFromKafka';
import { combineReducers } from "redux";

const allReducers = combineReducers({
  businessesReducer: businessesReducer,
  searchParamsReducer: searchParamsReducer,
  searchParamsFromKafkaReducer: searchParamsFromKafkaReducer
});

export default allReducers;

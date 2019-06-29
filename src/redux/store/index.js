import allReducers from "../reducers/index";
import { createStore } from "redux";

const storeToUse = () => {
  return createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default storeToUse;

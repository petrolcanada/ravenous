import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./component/App/App";
import * as serviceWorker from "./serviceWorker";
import storeToUse from './redux/store/index';
import updateSearchParamsAction from './redux/actions/index';


const store = storeToUse();
//dispatch action
store.dispatch(
    updateSearchParamsAction({
    term: "111",
    location: "111",
    sortBy: "best_match"
  })
);

// console.log(store.getState());

store.dispatch(
    updateSearchParamsAction({
      term: "222",
      location: "222",
      sortBy: "best_match"
    })
  );
  
//   console.log(store.getState());


ReactDOM.render(
    // <Provider store={store}>{/* <App /> */}</Provider>,
    <Provider store={store}>
        <App/>
    </Provider>
  ,document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

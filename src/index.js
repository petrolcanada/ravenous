import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./component/App/App";
import * as serviceWorker from "./serviceWorker";
import storeToUse from './redux/store/index';
import openSocket from 'socket.io-client';

const store = storeToUse();
// const socket = openSocket('http://localhost:3000');
// socket.on('messageFromKafka', data => {
//   console.log(`${data} is recieved on frontend in index.js`);
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root")
);
serviceWorker.unregister();

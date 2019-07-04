import React from "react";
import "./App.css";
import { connect } from "react-redux";
import BusinessList from "../BusinessList/BusinessList.js";
import SearchBar from "../SearchBar/SearchBar";
import _ from "lodash";

const App = ({ businesses }) => {
  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar />
      {_.isEmpty(businesses) ? null : <BusinessList />}
    </div>
  );
};

const mapStateToProps = state => {
  return { businesses: state.businessesReducer };
};

export default connect(mapStateToProps)(App);

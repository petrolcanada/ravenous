import React from "react";
import "./App.css";
import { connect } from "react-redux";
import BusinessList from "../BusinessList/BusinessList.js";
import SearchBar from "../SearchBar/SearchBar";
import _ from "lodash";
import SearchParamsFromKafka from "../searchParamsFromKafka/searchParamsFromKafka";
import { searchParamsFromKafkaAction } from "../../redux/actions";
import openSocket from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    const socket = openSocket('http://localhost:3000');
    socket.on('messageFromKafka', message => {
      console.log(`${message} is recieved on frontend from constructor`);
      this.props.searchParamsFromKafkaAction(message);
    });
  }
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        {_.isEmpty(this.props.searchParamsFromKafka) ? null : <SearchParamsFromKafka />}
        {_.isEmpty(this.props.businesses) ? null : <BusinessList />}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    businesses: state.businessesReducer,
    searchParamsFromKafka: state.searchParamsFromKafkaReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchParamsFromKafkaAction: (message) => dispatch(searchParamsFromKafkaAction(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

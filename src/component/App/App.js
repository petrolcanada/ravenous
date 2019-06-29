import React from "react";
import "./App.css";
import { connect } from "react-redux";
import BusinessList from "../BusinessList/BusinessList.js";
import SearchBar from "../SearchBar/SearchBar";
import { Yelp } from "../../util/Yelp";
import { useSelector } from "react-redux";

const App = ({}) => {
  const searchYelp = (term, location, sortBy) => {
    Yelp.search(
      term === "" ? "mexican" : term,
      location === "" ? "new york" : location,
      sortBy
    ).then(businesses => {
      // this.props.updateSearchParams({businesses:businesses});
      // this.setState({businesses: businesses});
    });
  };
  const businesses = useSelector(state => state.businesses);
  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={searchYelp} />
      {businesses ? <BusinessList businesses={businesses} /> : null}
    </div>
  );
}

export default App;



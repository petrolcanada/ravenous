import React from "react";
import "./App.css";
import { connect } from "react-redux";
import BusinessList from "../BusinessList/BusinessList.js";
import SearchBar from "../SearchBar/SearchBar.js";
import { Yelp } from "../../util/Yelp";
import { updateSearchParams } from "../../redux/actions/index";

import { useSelector } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp = (term, location, sortBy) => {
    Yelp.search(
      term === "" ? "mexican" : term,
      location === "" ? "new york" : location,
      sortBy
    ).then(businesses => {
      // this.props.updateSearchParams({businesses:businesses});
      // this.setState({businesses: businesses});
    });
  };

  returnBusinesses = () => {
      return useSelector(state => state.businessesReducer)
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.returnBusinesses} />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     businesses: state.businesses
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateSearchParams: newParams => dispatch(updateSearchParams(newParams))
//   };
// };

// const App = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(appBeforeConnect);

export { App };

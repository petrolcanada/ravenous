import React from "react";
import ReactDOM from "react-dom";
import "./SearchBar.css";
import { useSelector } from "react-redux";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count"
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state={
    //     term:'',
    //     location:'',
    //     sortBy:'best_match'
    // };
    this.getSortByClass = this.getSortByClass.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearchYelp = this.handleSearchYelp.bind(this);
  }

  returnSearchParams = () => {
    return useSelector(state => state.searchParamsReducer);
  };

  getSortByClass(sortByOptionValue) {
    const sortBy = this.returnSearchParams().sortBy;
    console.log(sortBy);
    if (sortByOptionValue === "best_match") {
      return "active";
    } else {
      return "false";
    }
  }

  handleSearchYelp(event) {
    const searchParams = this.returnSearchParams();
    event.preventDefault();
    this.props.searchYelp(
      searchParams.term,
      searchParams.location,
      searchParams.sortBy
    );
  }

  handleSortByChange(sortByOptionValue) {
    this.setState({ sortBy: sortByOptionValue });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  renderSortByOptions() {
    return Object.entries(sortByOptions).map(
      ([sortByOption, sortByOptionValue]) => {
        return (
          <li
            key={sortByOption}
            onClick={() => {
              this.handleSortByChange(sortByOptionValue);
            }}
            className={this.getSortByClass(sortByOptionValue)}
          >
            {sortByOption}
          </li>
        );
        // return (<li key={sortByOption} onClick={this.handleSortByChange.bind(this,sortByOptionValue)} className={()=>this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>);
      }
    );
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            onChange={this.handleTermChange}
            placeholder="Search Businesses"
          />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearchYelp}>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;

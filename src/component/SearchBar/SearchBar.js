import React from "react";
import ReactDOM from "react-dom";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import updateSearchParamsAction from "../../redux/actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count"
};

const SearchBar = ({ updateSearchParams,searchParams, searchYelp }) => {
  //   const searchParams = useSelector(state => state.searchParamsReducer);
  const dispatch = useDispatch();

  const getSortByClass = sortByOptionValue => {
    console.log(sortByOptionValue + " " + searchParams.sortBy);
    if (sortByOptionValue === searchParams.sortBy) {
      return "active";
    } else {
      return "false";
    }
  };

  const handleSearchYelp = event => {
    event.preventDefault();
    searchYelp(searchParams.term, searchParams.location, searchParams.sortBy);
  };

  const handleSortByChange = sortByOptionValue => {
    console.log(sortByOptionValue + " " + searchParams.sortBy);
    Object.assign(searchParams, { sortBy: sortByOptionValue });
    // dispatch(updateSearchParamsAction(searchParams));
    updateSearchParams(searchParams);
  };

  const handleTermChange = event => {
    Object.assign(searchParams, { term: event.target.value });
    // dispatch(updateSearchParamsAction(searchParams));
    updateSearchParams(searchParams);
  };

  const handleLocationChange = event => {
    Object.assign(searchParams, { location: event.target.value });
    // dispatch(updateSearchParamsAction(searchParams));
    updateSearchParams(searchParams);
  };

  const renderSortByOptions = () => {
    return Object.entries(sortByOptions).map(
      ([sortByOption, sortByOptionValue]) => {
        return (
          <li
            key={sortByOption}
            onClick={() => {
              handleSortByChange(sortByOptionValue);
            }}
            className={getSortByClass(sortByOptionValue)}
          >
            {sortByOption}
          </li>
        );
      }
    );
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input onChange={handleTermChange} placeholder="Search Businesses" />
        <input onChange={handleLocationChange} placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <a onClick={handleSearchYelp}>Let's Go</a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchParams: state.searchParamsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: searchParams =>
      dispatch(updateSearchParamsAction(searchParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

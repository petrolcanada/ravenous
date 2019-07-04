import React from "react";
import "./SearchBar.css";
import {
  updateSearchParamsAction,
  businessesReceivedAction
} from "../../redux/actions/index";

import { connect } from "react-redux";
import Yelp from "../../util/Yelp";
import _ from "lodash";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count"
};

const SearchBar = ({
  updateSearchParams,
  searchParams,
  businessesReceived
}) => {
  const getSortByClass = sortByOptionValue => {
    console.log(
      "Getsortbyclass " + sortByOptionValue + " " + searchParams.sortBy
    );
    if (sortByOptionValue == searchParams.sortBy) {
      return "active";
    } else {
      return "false";
    }
  };

  const handleSearchYelp = event => {
    event.preventDefault();
    Yelp.search(
      _.isEmpty(searchParams.term)?'japan':searchParams.term,
      _.isEmpty(searchParams.location)?'toronto':searchParams.location,
      searchParams.sortBy
    ).then(businesses => {
      console.log(businesses);
      businessesReceived(businesses);
    });
  };

  const handleSortByChange = sortByOptionValue => {
    Object.assign(searchParams, { sortBy: sortByOptionValue });
    updateSearchParams(searchParams);
  };

  const handleTermChange = event => {
    Object.assign(searchParams, { term: event.target.value });
    updateSearchParams(searchParams);
  };

  const handleLocationChange = event => {
    Object.assign(searchParams, { location: event.target.value });
    updateSearchParams(searchParams);
  };

  const renderSortByOptions = () => {
    console.log("rendersortbyoptions");
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
  return { searchParams: state.searchParamsReducer };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: searchParams =>
      dispatch(updateSearchParamsAction(searchParams)),
    businessesReceived: businesses =>
      dispatch(businessesReceivedAction(businesses))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

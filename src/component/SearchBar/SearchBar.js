import React from "react";
import "./SearchBar.css";
import {
  updateSearchParamsAction,
  businessesReceivedAction,
  updateTimesAction,
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
  businessesReceived,
  updateTimes,
  times
}) => {
  const getSortByClass = sortByOptionValue => {
    if (sortByOptionValue == searchParams.sortBy) {
      return "active";
    } else {
      return "false";
    }
  };

  const handleSearchYelp = event => {
    event.preventDefault();
    Yelp.search(
      _.isEmpty(searchParams.term) ? 'japan' : searchParams.term,
      _.isEmpty(searchParams.location) ? 'toronto' : searchParams.location,
      searchParams.sortBy
    ).then(businesses => {
      businessesReceived(businesses);
    });
    Yelp.sendMessageToKafka(
      _.isEmpty(searchParams.term) ? 'japan' : searchParams.term,
      _.isEmpty(searchParams.location) ? 'toronto' : searchParams.location,
      searchParams.sortBy);
  };
  const handleSearchYelpOneM = event => {
    event.preventDefault();
    for (let i = 0; i < times; i++) {
      if (i == 0) {
        Yelp.search(
          _.isEmpty(searchParams.term) ? 'japan' : searchParams.term,
          _.isEmpty(searchParams.location) ? 'toronto' : searchParams.location,
          searchParams.sortBy
        ).then(businesses => {
          businessesReceived(businesses);
        });
        Yelp.sendMessageToKafka(
          _.isEmpty(searchParams.term) ? 'japan' : searchParams.term,
          _.isEmpty(searchParams.location) ? 'toronto' : searchParams.location,
          searchParams.sortBy);
      } else {
        Yelp.sendMessageToKafka(
          _.isEmpty(searchParams.term) ? 'japan' : searchParams.term,
          _.isEmpty(searchParams.location) ? 'toronto' : searchParams.location,
          searchParams.sortBy);
      }
    }
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

  const handleTimesChange = event => {
    updateTimes(event.target.value);
  }

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
      <div className="SearchBar-submit-second">
        <a onClick={handleSearchYelpOneM}>{ `Let's Go ${times == 0 ? '' : times} times`}</a>
        <input placeholder="Times" onChange={handleTimesChange}></input>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchParams: state.searchParamsReducer,
    times: state.timesReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: searchParams =>
      dispatch(updateSearchParamsAction(searchParams)),
    businessesReceived: businesses =>
      dispatch(businessesReceivedAction(businesses)),
    updateTimes: timesToUpdate => {
      dispatch(updateTimesAction(timesToUpdate))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

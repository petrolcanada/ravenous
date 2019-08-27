import React from "react";
import { connect } from "react-redux";

const SearchParamsFromKafka = ({ searchParamsFromKafka }) => {
    return (
        <div className="searchParamsFromKafka">
            {
                searchParamsFromKafka.map((ele,i) => {
                    return (<p key={i}>{ele}</p>)
                })
            }
        </div>
    )
};

const mapStateToProps = state => {
    return { searchParamsFromKafka: state.searchParamsFromKafkaReducer };
};

export default connect(mapStateToProps)(SearchParamsFromKafka);


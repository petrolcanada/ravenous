import React from "react";
import { connect } from "react-redux";
import Business from "../Business/Business";
import "./BusinessList.css";

const BusinessList = ({ businesses }) => {
  return (
    <div className="BusinessList">
      {businesses.map(business => {
        return (
          <Business
            key={business.id}
            imageSrc={business.imageSrc}
            name={business.name}
            address={business.address}
            city={business.city}
            state={business.state}
            zipCode={business.zipCode}
            category={business.category}
            rating={business.rating}
            reviewCount={business.reviewCount}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { businesses: state.businessesReducer };
};

export default connect(mapStateToProps)(BusinessList);

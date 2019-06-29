import React from 'react';
import ReactDOM from 'react-dom';
import Business from '../Business/Business';
import './BusinessList.css';

class BusinessList extends React.Component {
    render(){
        return (
            <div className="BusinessList">
                {
                    this.props.businesses.map( business => {
                        return (<Business 
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
                                />)
                        }
                    )
                }
            </div>
        );
    };
};

export default BusinessList;

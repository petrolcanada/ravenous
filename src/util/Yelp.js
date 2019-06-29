const apiKey = 'QHEsYVgOygm_-L8s63NcpjaD2KoBAbQj4MskTUr6fgeygwEmyNXCNz5F_UJg8RtYohq2aT5aq9wg3S-CYEoMvaAitLAuDtQ1XWe17ptwTzfY_rLQw9c_UavOkZQLXXYx';
const clientId = '_ARj6X0kQzYPQtGoxfGeKQ';

const Yelp = {
    async search(term, location, sortBy) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const headers = {headers: {Authorization: `Bearer ${apiKey}` }};
        return fetch(url,headers).then(
            response => response.json()).then(
                jsonResponse => {
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business => {
                            return {
                                id: business.id,
                                imageSrc:business.image_url,
                                name: business.name,
                                address: business.location.address1,
                                city:business.location.city,
                                state:business.location.state,
                                zipCode:business.location.zip_code,
                                category:business.categories[0].title,
                                rating:business.rating,
                                reviewCount:business.review_count
                            }
    
                        })
                    }
                });
    
    }
}

export {Yelp};
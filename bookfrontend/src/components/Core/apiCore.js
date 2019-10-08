import { API } from '../../config'

/*---------- GET PRODUCT-----------*/
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    });
}


/*---------- GET CATEGORIES-----------*/
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

/*---------- FILTER -----------*/
export const getFilteredProducts = (skip, limit, filters = {})  => {
    const data = {
        limit, skip, filters
    }

    // Send the data to the backend
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: `application/json`,
            "Content-type": "application/json",
        },
        // Convert the object to Json string 
        body: JSON.stringify( data ) 
        })
    .then( response => {
        return response.json()
    })
    .catch( err => {
        console.log(err);
    })
    
};
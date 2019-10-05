import { API } from '../config'

export const signup = user  => {
    // Send the data to the backend
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: `application/json`,
            "Content-type": "application/json"
        },
        // Convert the object to Json string 
        body: JSON.stringify( user ) 
        })
    .then( response => {
        return response.json()
    })
    .catch( err => {
        console.log(err);
    })
    
};

export const signin = user  => {
    // Send the data to the backend
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: `application/json`,
            "Content-type": "application/json"
        },
        // Convert the object to Json string 
        body: JSON.stringify( user ) 
        })
    .then( response => {
        return response.json()
    })
    .catch( err => {
        console.log(err);
    })
    
};
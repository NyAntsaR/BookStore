import { API } from '../config'


/*---------- SIGNUP -----------*/
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


/*---------- SIGNIN -----------*/
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

/*----------- SAVE USER IN THE LOCALSTORAGE -------*/
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))

        next();
    }
}

/*---------- SIGNOUT -----------*/
export const signout = (next) => {
    // Remove the token from localStorage
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next();
        // Make a request to the backend
        // Redirect the user to the home page
        return fetch(`${API}/signout`, {
            method:'GET',
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => console.log(err));
    }
    // Redirect the user to Home page
}


/*---------- SECURING ROUTES -----------*/
export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        // Make sure that the jwt is in JSON format
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
}
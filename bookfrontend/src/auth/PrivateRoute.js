import React from 'react'
import { Route , Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'


// Check if the user is authenticated
// Use this component to access routes
const PrivateRoute = ( { component: Component, ...rest } ) => (
    <Route {...rest} render={ props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{ 
            pathname: '/signin', 
            state: { from: props.location}
        }} />
    )} />
);

export default PrivateRoute;
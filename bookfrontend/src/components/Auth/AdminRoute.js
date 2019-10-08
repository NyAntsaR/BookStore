import React from 'react'
import { Route , Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'


// Check if the user is authenticated
// Use this component to access routes
const AdminRoute = ( { component: Component, ...rest } ) => (
    // check both if the user is authenticated and have an admin role
    <Route {...rest} render={ props => 
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props} />
    ) : (
        <Redirect to={{ 
            pathname: '/signin', 
            state: { from: props.location}
        }} />
    )} />
);

export default AdminRoute;
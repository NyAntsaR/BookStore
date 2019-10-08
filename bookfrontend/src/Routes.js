/*------ REACT -------*/
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


/*------ AUTHENTICATION -------*/
import Signup from './components/User/Signup';
import Signin from './components/User/Signin';
import Home from './components/Core/Home';
import Shop from './components/Core/Shop';

/*------ AUTHORIZATION -------*/
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/User/UserDashboard';
import AdminRoute from './components/Auth/AdminRoute';
import AdminDashboard from './components/User/AdminDashboard';

/*------ CATEGORY -------*/
import AddCategory from './components/Admin/AddCategory';

/*------ PRODUCT -------*/
import AddProduct from './components/Admin/AddProduct';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={ Signin } />
                <Route path="/signup" exact component={ Signup } />
                <Route path="/" exact component={ Home } />
                <Route path="/shop" exact component={ Shop } />
                <PrivateRoute path="/user/dashboard" exact component={ Dashboard } />
                <AdminRoute path="/admin/dashboard" exact component={ AdminDashboard } />
                <AdminRoute path="/create/category" exact component={ AddCategory } />
                <AdminRoute path="/create/product" exact component={ AddProduct } />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

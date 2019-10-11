import React from "react";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header" style={{backgroundColor: '#BCB0BA'}}>User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link style={{color: '#6C4968'}} className="nav-link" to="/cart">    
                            <i class="fa fa-shopping-cart"></i> My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link style={{color: '#6C4968'}} className="nav-link" to="/profile/update">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header" style={{backgroundColor: '#BCB0BA'}}>User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered as a Customer"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header" style={{backgroundColor: '#BCB0BA'}}>Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">History</li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Hello ${name}!`}
            className="container-fluid"
        
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

import React, { useState } from "react";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container description"
        >
            <div className="row">
                <div>...</div>
            </div>
            
        </Layout>
    );
};

export default ManageProducts;


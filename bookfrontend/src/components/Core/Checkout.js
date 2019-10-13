import React, { useState, useEffect } from "react";
import {getBraintreeClientToken} from "./apiCore"
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        // use for UI
        instance: {},
        address: ''
    })

    // Make a request to the backend
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    // Run when the component mount and every time there is a change
    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ ...data, clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>
                {showDropIn()}
            </div>
        ) : (
            <Link to="/signin">
                <button className="btn">Sign in to checkout</button>
            </Link>
        );
    };

    const showDropIn = () => (
        // Show the drop in when token is there
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance =>instance  = instance} />
                    <button style={{backgroundColor: '#4B3655', color: 'white'}} className="btn">
                        <i class="fa fa-shopping-bag" style={{fontSize: '20px', color:'white', border: "1px solid #4B3655 "}}></i>
                            Checkout
                    </button>
                </div>
            ) : null}
        </div>
    )

    return (
        <div>
            <h2>Total: <span style={{color: "green"}}> ${getTotal()} </span></h2>
            {showCheckout()}
        </div>
    );
};

export default Checkout;

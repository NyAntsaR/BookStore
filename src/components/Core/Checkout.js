import React, { useState, useEffect } from "react";
import {getBraintreeClientToken, processPayment} from "./apiCore"
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelpers'

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
                setData({ clientToken: data.clientToken });
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

    const buy = () => {
        // send the nonce ( payment method) to the server
        // Nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce' to the backend
                // and also total to be charged
                console.log(
                    "send nonce and total to process: ",
                    nonce,
                    getTotal(products)
                );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                // send data to the backend
                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response
                        setData({ ...data, success: response.success });
                        // empty cart
                        emptyCart(() =>{
                            console.log('payment success and emoty cart')
                        })
                        
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => (
        // Show the drop in when token is there
        // onBlur => wherever I click on the page, will run and empty the error
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => data.instance  = instance} />
                    <button 
                        style={{backgroundColor: '#4B3655', color: 'white'}} 
                        className="btn btn-block" 
                        onClick={buy}>
                        <i class="fa fa-credit-card" aria-hidden="true" style={{fontSize: '20px', color:'white', border: "1px solid #4B3655 "}}></i>  
                            Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thank you! Your payment was successful!
        </div>
    )

    return (
        <div>
            <h2>Total: <span style={{color: "green"}}> ${getTotal()} </span></h2>
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;

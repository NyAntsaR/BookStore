import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h5 className="description" style={{color: '#4B3655'}}>
            <span style={{color: "black"}}>Your cart is empty.</span>  <br /> 
            <Link style={{color: '#4B3655' }} to="/shop">Continue shopping</Link>
        </h5>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className=" description col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;

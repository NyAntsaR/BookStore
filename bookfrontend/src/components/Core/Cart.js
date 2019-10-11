import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from "./Card";
import {getCart} from './cartHelper'
import { Link } from 'react-router-dom'

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = (items) => {
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
                    />
                ))}
            </div>
        );
    };

    const noItems = () => (
        <h2>Your cart is empty. <br/> <Link to="/shop">Constinue Shopping</Link></h2>
    )

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items!"
            className="container-fluid"
        >   
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItems()}
                </div>

                <div className="col-6">
                    <p>Show checkout options/shipping address/total/update quantity</p>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;
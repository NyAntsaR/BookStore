import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from "./Card";
import Search from './Search'

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductByArrival= () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        });
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout
            title="Welcome to your Book Store Online!"
            description="Browse and find your book"
            className="container-fluid"
        >
            <Search className="search" />
            
            <div className="container">
                <h2 style={{fontFamily: 'Big Shoulders Display', fontSize: '20px', fontWeight: 'bold', textDecoration: "underline" }} className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((product, i) => (
                         <div className="col-4 mb-3" style={{width: '200px'}}>
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>

                <hr/>

                <h2 style={{fontFamily: 'Big Shoulders Display', fontSize: '20px', fontWeight: 'bold', textDecoration: "underline"}} className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
            
        </Layout>
    )
}

export default Home;
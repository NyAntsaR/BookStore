import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

// Details page
const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    // Grab the product id from the url
    // props will updated the page 
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container"
        >
            <h2 className="mb-4">Product detail</h2>
            <div className="row">
                <div className='col-6'>
                    {product && product.description && <Card product={product} showViewProductButton={false}/>} 
                </div>
                <div className='col-4'>
                    <h2>Related Product</h2>
                    {relatedProduct.map((p, i) => (
                        <Card style={{margin: '10px'}} key={i} product={p} />
                    ))} 
                </div>
            </div>
        </Layout>
    )
};

export default Product;
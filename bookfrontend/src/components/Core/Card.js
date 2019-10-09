import React from 'react'
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import 'font-awesome/css/font-awesome.min.css';
// to show the date
import moment from 'moment'

const Card = ({ product, showViewProductButton = true }) => {

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <button style={{backgroundColor:'#D4A5B8', color: 'white'}} className="btn mt-2 mb-2 mr-2">
                    View Product
                </button>
            )
        )
    }

    const showStock = (quantity) => {
        return quantity > 0 ? 
            <span style={{borderRadius: '5px', border:'2px solid #D4D2D5', backgroundColor: '#F2D4F3'}}>In Stock</span> : 
            <span style={{borderRadius: '5px', border:'2px solid #D4D2D5', backgroundColor: 'red'}}>Out of stock</span>
    }

    const showAddToCartButton = () => {
        return (
            <button style={{border: "none"}}>< i className="fa fa-cart-plus" aria-hidden="true" style={{color:'#D4A5B8', fontSize: '35px'}}></i>
            </button>
        )
    }

    return (
        <div className="card">
            <div className="card-header" style={{backgroundColor:'#D4A5B8', color: 'white'}}>{ product.name }</div>
            <div className="card-body">
                <ShowImage item={product} url="product" />
                <p className="lead mt-2" style={{backgroundColor:'#F2D4F3'}}>{product.description.substring(0, 100)}</p>
                <p className="black-10"style={{backgroundColor:"#ECE2ED"}}>${product.price}</p>
                <p className="black-9" style={{backgroundColor: '#F8EEF9'}}>Category: {product.category && product.category.name}</p>
            <p className="black-8" style={{backgroundColor: '#D4D2D5'}}>Added on {moment(product.createdAt).fromNow()}</p>

                {showStock(product.quantity)}
                <hr />

                <Link to={`/product/${product._id}`}>
                    {showViewButton(showViewProductButton)}
                </Link>

                {showAddToCartButton() }

            </div>
        </div>
    )
}  

export default Card;
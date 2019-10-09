import React from 'react'
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import 'font-awesome/css/font-awesome.min.css';

const Card = ({ product }) => {
    return (
        <div className="col-4 mb-3" style={{width: '200px'}}>
            <div className="card">
                <div className="card-header" style={{backgroundColor:'#D4A5B8', color: 'white'}}>{ product.name }</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    <hr />
                    <Link to="/">
                        <button style={{backgroundColor:'#D4A5B8', color: 'white'}} className="btn mt-2 mb-2 mr-2">
                            View Product
                        </button>
                    </Link>
                    <button style={{border: "none"}}>< i className="fa fa-cart-plus" aria-hidden="true" style={{color:'#D4A5B8', fontSize: '35px'}}></i>
                    </button>
                </div>
            </div>
        </div>
    )
}  

export default Card;
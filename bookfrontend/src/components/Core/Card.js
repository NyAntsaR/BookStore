import React, {useState} from 'react'
import { Link , Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import 'font-awesome/css/font-awesome.min.css';
// to show the date
import moment from 'moment'
import {addItem, updateItem} from './cartHelper'

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false }) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count);

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

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        }) 
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} style={{border: "none"}}>< i className="fa fa-cart-plus" aria-hidden="true" style={{color:'#D4A5B8', fontSize: '35px'}}></i>
                </button>
            )
        )
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="card">
            <div className="card-header" style={{backgroundColor:'#D4A5B8', color: 'white'}}>{ product.name }</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
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

                {showAddToCart(showAddToCartButton) }

                {showCartUpdateOptions(cartUpdate)}

            </div>
        </div>
    )
}  

export default Card;
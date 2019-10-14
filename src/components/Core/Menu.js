import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../Auth";
import { itemTotal } from "./cartHelpers";
import 'font-awesome/css/font-awesome.min.css';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#B5ADB3", fontWeight:"bold"};
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    <div className="description">
        <ul className="nav nav-tabs" style={{backgroundColor: '#76135C', padding: '10px'}}>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">
                <i class="fa fa-home" aria-hidden="true"></i> Home
                </Link>
            </li>

            <li className="nav-item" style={{margin: 'auto'}}>
                <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
                <i class="fa fa-shopping-basket" aria-hidden="true"></i> Shop
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
                < i className="fa fa-cart-plus" aria-hidden="true" style={{color:'white', fontSize: '30px'}}></i>{" "}
                    <sup>
                        <small className="cart-badge" style={{backgroundColor: 'white', color:"#56164D", fontWeight:"bold", borderRadius: '50%', fontSize: '20px', padding: '2px'}}>{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        <i class="fa fa-dashboard"></i> Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        <i class="fa fa-dashboard"></i> Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                            <i class="fa fa-sign-in" aria-hidden="true"></i> Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>  Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
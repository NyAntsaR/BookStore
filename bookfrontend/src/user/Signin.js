import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { signin } from '../auth'


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        // If error, display a messge
        error: '',
        loading: false,
        // redirect the user to the home page if success
        redirectToRefferer: false,
    });

    // Destruction
    const { email, password, loading, error, redirectToRefferer } = values;

    // Function returning another function
    const handleChange = name => event =>  {
        setValues( {...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        // Prevent the page to reload
        event.preventDefault();
        setValues({ ...values, error: false, /*show the user that it's loading */ loading: true })
        signin( { email, password } )
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false })
            } else {
                setValues({...values, redirectToRefferer: true})
            }
        });
    };


    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={ handleChange('email') } 
                    type="email" className="form-control"
                    value={ email }  />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={ handleChange('password') }  
                    type="password" className="form-control"
                    value={ password }  />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none'}}>
            { error }
        </div>
    );

    const showLoading = () => 
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );
    
    const redirectUser = () => {
        if(redirectToRefferer) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout 
            className="container col-md-8 offset-md-2" 
            title="Signup" 
            description="Signup to Node React BookStore App"
        >
            { showLoading() }
            { showError() }
            { signinForm() }
            { redirectUser() }
        </Layout>
    )
};

export default Signin;


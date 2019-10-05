import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { API } from '../config'


const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        // If error, display a messge
        error: '',
        success: false
    });

    // Destruction
    const { name, email, password, success, error } = values;

    // Function returning another function
    const handleChange = name => event =>  {
        setValues( {...values, error: false, [name]: event.target.value });
    };

    const signup = user  => {
        console.log( name, email, password );
        // Send the data to the backend
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: `application/json`,
                "Content-type": "application/json"
            },
            // Convert the object to Json string 
            body: JSON.stringify( user ) 
            })
        .then( response => {
            return response.json()
        })
        .catch( err => {
            console.log(err);
        })
        
    };

    const clickSubmit = (event) => {
        // Prevent the page to reload
        event.preventDefault();
        setValues({ ...values, error: false })
        signup( { name, email, password } )
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false })
            } else {
                setValues({...values, name:'', email:'', password:'', success: true})
            }
        });
    };


    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={ handleChange('name') }
                    type="text" className="form-control"
                    value={ name } />
        
            </div>

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

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none'}}>
            New account is created. Please Signin! <Link to='/signin'>Signin</Link>
        </div>
    );

    return (
        <Layout 
            className="container col-md-8 offset-md-2" 
            title="Signup" 
            description="Signup to Node React BookStore App"
        >
            { showSuccess() }
            { showError() }
            { signupForm() }
        </Layout>
    )
};

export default Signup;
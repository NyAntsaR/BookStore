import React, { useState } from 'react'
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
    const { name, email, password } = values;

    // Function returning another function
    const handleChange = name => event =>  {
        setValues( {...values, error: false, [name]: event.target.value });
    };

    const signup = user  => {
        console.log( name, email, password );
        // Send the data to the backend
        fetch(`${API}/signup`, {
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
        signup( { name, email, password } )
    };


    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={ handleChange('name') } type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={ handleChange('email') } type="email" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={ handleChange('password') }  type="password" className="form-control" />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout 
            className="container col-md-8 offset-md-2" 
            title="Signup" 
            description="Signup to Node React BookStore App"
        >
            { signupForm() }
            { JSON.stringify(values) }
        </Layout>
    )
};

export default Signup;
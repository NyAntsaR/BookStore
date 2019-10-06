import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'


const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructure user and token from localstorage
    const { user, token } = isAuthenticated()


    const handleChange = (e) => {
        setError('')
        // Grap the name and set it to the input value
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // Make request to the backend to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            } else{
                setError("");
                setSuccess(true);
            }
        })
    }   

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange}
                    value={ name }
                    autoFocus
                    required
                />
            </div>

            <button className="btn btn-outline-primary">
                Create category
            </button>
        </form>
    );

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">{name} is created</h3>
        }
    }


    const showError = () => {
        if(error) {
            // specified as unique in the database models
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to='/admin/dashboard' className='text-warning'>Back to dashboard</Link>
        </div>
    )

    return (
        <Layout title="Add a new Category" description={`Hello ${ user.name }, ready to add a new category`}>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                { showSuccess() }
                { showError() }
                { newCategoryForm() }
                { goBack() }
            </div>
        </div>
       
    </Layout>
    )
}

export default AddCategory;
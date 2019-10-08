import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from './apiCore'
import Card from "./Card";


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    // Destructure
    const {categories, category, search, results, searched} = data;

    // Get all the categories
    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, []);

    // Search Form
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">

                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Pick Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input 
                        type="search" 
                        className="form-control" 
                        onChange={handleChange('search')} 
                        placeholder="search by name" 
                    />
                </div>

                <div 
                    className="btn input-group-append" 
                    style={{border: 'none'}}>
                        <button className="input-group-text">
                            Search
                        </button>
                    </div>
            </span>
        </form>
    );

    // On submit
    const searchSubmit = () => {
        //
    }

    // Handle Change
    const handleChange = () => {
        //
    }

    return (
        <div className="row">
            <div className="container">{searchForm()}</div>
        </div>
    )
}

export default Search
import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories, list } from './apiCore'
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
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories()
    }, []);

    // Make Api request and get the data
    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };

    // Search Form
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select style={{fontFamily: 'Big Shoulders Display', fontSize: '20px' }}
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
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
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        style={{fontFamily: 'Big Shoulders Display', fontSize: '15px' }}
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none",  fontFamily: 'Big Shoulders Display', fontSize: '25px'}}
                >
                    <button className="input-group-text" style={{backgroundColor:'#D4A5B8', color:'white'}}>Search</button>
                </div>
            </span>
        </form>
    );

    // On submit
    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    return (
        <div>
            <div className="search container mb-3">{searchForm()}</div>
            <div className="search container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
}

export default Search
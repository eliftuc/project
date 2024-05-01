import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend';
import axios from 'axios';
import "../css/main.css"

const SearchPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const turkeysCities = [
        "Istanbul",
        "Ankara",
        "Izmir",
        "Bursa",
        "Adana",
        "Antalya",
        "Konya",
        "Gaziantep",
        "Diyarbakir",
        "Mersin",
        "Kayseri",
        "Eskisehir",
        "Manisa",
        "Hatay",
        "Samsun",
        "Denizli",
        "Sanliurfa",
        "Adapazari",
        "Malatya",
        "Kahramanmaras"
    ];

    useEffect(() => {
        axios.get(backend + '/products')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data); // Initialize filtered data with all products
                // Extract unique category names
                const categories = new Set(response.data.map(item => item.cate_name));
                setUniqueCategories(Array.from(categories));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Function to handle search input changes
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterData(selectedCategory, term, selectedLocation); // Filter data based on category, search term, and location
    };

    // Function to filter data based on category, search term, and location
    const filterData = (category, term, location) => {
        let filtered = data.filter(item => {
            let isCategoryMatch = category ? item.cate_name === category : true;
            let isNameMatch = term ? item.name.toLowerCase().includes(term.toLowerCase()) : true;
            let isLocationMatch = location ? item.country === location : true;
            return isCategoryMatch && isNameMatch && isLocationMatch;
        });
        setFilteredData(filtered);
    };

    // Function to handle category click
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        filterData(categoryName, searchTerm, selectedLocation); // Filter data based on category, search term, and location
    };

    // Function to handle location selection
    const handleLocationChange = (e) => {
        const location = e.target.value;
        setSelectedLocation(location);
        filterData(selectedCategory, searchTerm, location); // Filter data based on category, search term, and location
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 allNameHere">
                        <div className="allcate">
                            <div className="cate-title">
                                <h5>All Categories</h5>
                            </div>
                            {/* Map over unique categories to display */}
                            {uniqueCategories.map((category, index) => (
                                <div className="allIn" key={index} onClick={() => handleCategoryClick(category)}>
                                    <h2 className='allName'>{category}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <select value={selectedLocation} onChange={handleLocationChange}>
                                        <option value="">All Locations</option>
                                        {/* Map over Turkey's cities to display */}
                                        {turkeysCities.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-6 searchBar">
                                    <input
                                        className="inputFild"
                                        type="text"
                                        placeholder="Searching"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {filteredData.length === 0 ? (
                                    <p className='errorMsg'>Search related products not found.</p>
                                ) : (
                                    filteredData.map(item => (
                                        <div className="col-md-3 col-sm-6 col-sm-6" key={item.products_id}>
                                            <Link to={`/details/${item.products_id}`} className="image">
                                                <div className="main_pro product-grid">
                                                    <div className="product-image">
                                                        <img className="pic-1" src={`http://localhost:9000/images/` + item.images} />
                                                        <img className="pic-2" src={`http://localhost:9000/images/` + item.images} />
                                                    </div>
                                                    <div className="product-content">
                                                        <h6 className="mt-3 mb-3 title">{item.cate_name}</h6>
                                                        <h3 className="title"><a href="#">{item.name}</a></h3>
                                                        <div className="price"> {item.price} TL</div>
                                                    </div>
                                                    <div className="d-grid mt-4 mb-2">
                                                        <button className="btn main-btn" type="button">Add to Cart</button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

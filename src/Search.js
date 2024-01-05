import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [searchBy, setSearchBy] = useState('title');
    
    useEffect(() => {
        fetch('http://localhost:7000/blogs/')
        .then((response) => response.json())
        .then((jsonData) => {
            setData(jsonData);
            setFilteredData(jsonData);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
            setIsLoading(false);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        let filtered;

        if (searchBy === 'title') {
            filtered = data.filter((item) => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (searchBy === 'body') {
            filtered = data.filter((item) =>
                item.body.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        

        setFilteredData(filtered);
        setShowResults(true);
    };

    return (
        <div className="search">
            <h2>Search by
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="body">Contents</option>
                </select>
            </h2>
            <form onSubmit={handleSearch}>
                <label>Search Term:</label>
                <input
                    type="text"
                    required
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                { !isLoading && <button>Search</button> }
                { isLoading && <button disabled>Searching...</button> }
            </form>
            { showResults &&
                <div className='blog-list'>
                    {filteredData.map((item) => (
                        <div className="blog-preview" key={item.id}>
                            <Link to={`/blogs/${item.id}`}>
                                <h2>{item.title}</h2>
                                <p>Written by: {item.author}</p>
                            </Link>
                            <br />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};


export default SearchComponent
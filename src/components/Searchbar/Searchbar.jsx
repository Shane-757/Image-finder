import React, { useState } from 'react';
import '../styles.css'


const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="Searchbar"> 
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button"> 
          <span className="SearchForm-button-label">Search</span> 
        </button>

        <input
          className="SearchForm-input" 
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
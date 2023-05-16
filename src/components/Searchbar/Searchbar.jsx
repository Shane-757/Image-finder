import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const Searchbar = ({ onSubmit, onDropdownChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownValue, setDropdownValue] = useState(20); // Initial value for the dropdown

  const handleSubmit = (event) => {
  event.preventDefault();
  onSubmit(searchQuery, dropdownValue);
};

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownChange = (event) => {
  const value = parseInt(event.target.value);
  setDropdownValue(value);
  onDropdownChange(value);
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
          onChange={handleInputChange}
        />

        <select className="SearchForm-dropdown" value={dropdownValue} onChange={handleDropdownChange}>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDropdownChange: PropTypes.func.isRequired
};

export default Searchbar;
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(query); // Виклик функції, переданої через проп
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter search query"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

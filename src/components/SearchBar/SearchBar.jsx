import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term.'); // Повідомлення через toast
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;

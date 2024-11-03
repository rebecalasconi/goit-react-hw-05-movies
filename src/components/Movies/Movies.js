// src/components/Movies/Movies.js
import React, { useState } from 'react';
import { searchMovies } from '../SharedFiles/api'; // Ensure the path to the API file is correct
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) { // Ensure query is not empty
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  };

  return (
    <div className={styles.movies}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
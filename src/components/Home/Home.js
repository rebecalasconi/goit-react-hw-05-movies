// src/components/Home/Home.js
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../SharedFiles/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Today</h1>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
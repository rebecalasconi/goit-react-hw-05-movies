// src/components/MovieDetails/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews } from '../SharedFiles/api';
import BackButton from '../SharedFiles/BackButton';
import Loader from '../SharedFiles/Loader';
import styles from './MovieDetails.module.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        const castData = await fetchMovieCast(movieId);
        const reviewsData = await fetchMovieReviews(movieId);

        setMovie(movieData);
        setCast(castData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) return <Loader />; // Loader while fetching movie data

  const { title, overview, poster_path } = movie;

  return (
    <div className={styles.movieDetails}>
      <BackButton />
      <div className={styles.movieContent}>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className={styles.movieImage} />
        <div className={styles.movieInfo}>
          <h1>{title}</h1>
          <p>{overview}</p>
        </div>
      </div>

      <h2>Additional Information</h2>
      <div className={styles.additionalInfo}>
        <button className={styles.button} onClick={() => setShowCast(!showCast)}>
          Cast
        </button>
        {showCast && (
          <div className={styles.infoBox}>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <div key={actor.id} className={styles.actor}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.actorImage}
                  />
                  <div>
                    <p><strong>{actor.name}</strong> as {actor.character}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </div>
        )}

        <button className={styles.button} onClick={() => setShowReviews(!showReviews)}>
          Reviews
        </button>
        {showReviews && (
          <div className={styles.infoBox}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                  <p><strong>{review.author}:</strong> {review.content}</p>
                </div>
              ))
            ) : (
              <p>We don't have any reviews for this movie.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
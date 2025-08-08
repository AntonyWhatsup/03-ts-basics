import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  const imageUrlBase = 'https://image.tmdb.org/t/p/w500';

  if (!movies.length) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
            <img
              className={css.image}
              src={movie.poster_path ? `${imageUrlBase}${movie.poster_path}` : 'https://via.placeholder.com/500x750.png?text=No+Image'}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
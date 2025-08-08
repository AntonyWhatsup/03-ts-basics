import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from './services/movieService';
import { Movie } from './types/movie';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (query === '') return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const { results } = await fetchMovies({ query });
        if (results.length === 0) {
          toast.error('No movies found for your request.');
        }
        setMovies(results);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {movies.length > 0 && !loading && !error && <MovieGrid movies={movies} onSelect={handleMovieSelect} />}
      </main>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
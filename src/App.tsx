import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx/SearchBar";
import "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "./type/movie";
import { fetchMovies } from "./services/movieService";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieModal from "./components/MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  function openMovieModal(movie: Movie): void {
    setSelectedMovie(movie);
  }

  function closeMovieModal(): void {
    setSelectedMovie(null);
  }

  const onSubmit = async (query: string): Promise<void> => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);

      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request", {
          position: "top-center",
        });
      }

      setMovies(data);
    } catch {
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openMovieModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeMovieModal} />
      )}
    </>
  );
}

export default App;

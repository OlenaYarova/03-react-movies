import axios from "axios";
import type { Movie } from "../type/movie";
const API_KEY = import.meta.env.VITE_MOVIE_KEY;

export interface MoviesApiResponse {
  results: Movie[];
}

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  const params = {
    query,
    include_adult: false,
    language: "en-US",
  };
  const { data } = await axiosInstance.get<MoviesApiResponse>(
    "3/search/movie",
    {
      params,
    }
  );

  return data.results;
}

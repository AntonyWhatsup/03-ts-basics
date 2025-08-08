import axios from 'axios';
import type { ApiResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

interface FetchMoviesParams {
  query: string;
}

export const fetchMovies = async ({ query }: FetchMoviesParams): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};
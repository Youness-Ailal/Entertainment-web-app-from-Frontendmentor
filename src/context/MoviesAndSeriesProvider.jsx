import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import shuffle from "lodash/shuffle";

const APIKEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWM5NWI5OGYwZjUyMDE4N2E4M2VjYWIwYjExZDIyOCIsInN1YiI6IjY1NzZiMjI2YTg0YTQ3MmRlNTdlMGNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIlx3_OcoUs02OXdUVnoCBuDI40Gt1PAzjQtHfoYeBQ";
const BASE_URL = "https://api.themoviedb.org/3";
const MoviesContext = createContext();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: APIKEY,
  },
};
const bookmarkedStorage = JSON.parse(localStorage.getItem("bookmarks"));

const initialState = {
  trending: [],
  recommended: [],
  bookmarked: bookmarkedStorage || [],

  moviesLoading: true,

  movies: {
    popular: [],
    topRated: [],
    upcoming: [],
  },
  tv: {
    popular: [],
    topRated: [],
    onTheAir: [],
  },

  movie: {},
  movieLoading: false,
  movieVideos: [],
  movieActors: [],

  trendingLoading: true,
  recommendedLoading: true,

  searchedMovies: [],
  isSearching: false,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "trending/loadeded":
      return { ...state, trending: payload };

    case "trendingLoading/fetching":
      return { ...state, trendingLoading: true };

    case "trendingLoading/loadeded":
      return { ...state, trendingLoading: false };

    case "recommendedLoading/fetching":
      return { ...state, recommendedLoading: true, moviesLoading: true };

    case "recommendedLoading/loadeded":
      return { ...state, recommendedLoading: false, moviesLoading: false };

    case "recommended/loadeded":
      return { ...state, recommended: payload };

    case "bookmark/add":
      return { ...state, bookmarked: [...state.bookmarked, payload] };

    case "bookmark/remove":
      return {
        ...state,
        bookmarked: state.bookmarked.filter(movie => movie.id !== payload.id),
      };

    case "loading/start":
      return { ...state, moviesLoading: true };
    case "loading/finish":
      return { ...state, moviesLoading: false };

    case "popular_movie/loaded":
      return { ...state, movies: { ...state.movies, popular: payload } };
    case "top_rated_movie/loaded":
      return { ...state, movies: { ...state.movies, topRated: payload } };
    case "upcoming_movie/loaded":
      return { ...state, movies: { ...state.movies, upcoming: payload } };

    case "popular_tv/loaded":
      return { ...state, tv: { ...state.tv, popular: payload } };
    case "on_the_air_tv/loaded":
      return { ...state, tv: { ...state.tv, onTheAir: payload } };
    case "top_rated_tv/loaded":
      return { ...state, tv: { ...state.tv, topRated: payload } };

    case "search/loaded":
      return {
        ...state,
        searchedMovies: payload.list,
        isSearching: true,
      };
    case "search/cancel":
      return {
        ...state,
        isSearching: false,
      };

    case "movie/loading":
      return { ...state, movieLoading: true };
    case "movie/loaded":
      return {
        ...state,
        movie: payload.data,
        movieVideos: payload.videos,
        movieActors: payload.actors,
        movieLoading: false,
      };
  }
}

function MoviesAndSeriesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    trending,
    recommended,
    trendingLoading,
    recommendedLoading,
    bookmarked,
    movies,
    tv,
    searchQuery,
    searchedMovies,
    isSearching,
    movie,
    movieLoading,
    movieVideos,
    movieActors,
    moviesLoading,
  } = state;

  // fetch trending movies at page load
  useEffect(() => {
    async function getTrendingMovies() {
      dispatch({ type: "trendingLoading/fetching" });
      try {
        const res = await fetch(
          `${BASE_URL}/trending/all/day?language=en-US?page=1`,
          options
        );
        const data = await res.json();

        dispatch({ type: "trending/loadeded", payload: shuffle(data.results) });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "trendingLoading/loadeded" });
      }
    }
    getTrendingMovies();
  }, []);

  //fetch recommended movies at page load
  useEffect(() => {
    async function getRecommendedMovies() {
      dispatch({ type: "recommendedLoading/fetching" });
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?language=en-US&page=1`,
          options
        );

        const data = await res.json();

        dispatch({
          type: "recommended/loadeded",
          payload: shuffle(data.results),
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "recommendedLoading/loadeded" });
      }
    }
    getRecommendedMovies();
  }, []);

  // add bookmark movie or tv show
  function addBookmark(movieToAdd) {
    dispatch({ type: "bookmark/add", payload: movieToAdd });
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarked, movieToAdd])
    );
    movieToAdd.bookmarked = true;
  }

  // remove bookmark movie or tv show
  function removeBookmark(movieToRemove) {
    dispatch({
      type: "bookmark/remove",
      payload: movieToRemove,
    });
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarked.filter(movie => movie.id !== movieToRemove.id))
    );

    movieToRemove.bookmarked = false;
  }

  const fetchMoviesOrSeries = useCallback(async function fetchMoviesOrSeries(
    type = "movie",
    category = "popular"
  ) {
    dispatch({ type: "loading/start" });

    try {
      const res = await fetch(
        `${BASE_URL}/${type}/${category}?language=en-US&page=1`,
        options
      );
      const data = await res.json();
      dispatch({ type: `${category}_${type}/loaded`, payload: data.results });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loading/finish" });
    }
  },
  []);

  async function handleSearch(query, signal) {
    try {
      dispatch({ type: "loading/start" });
      if (query.length) {
        const res = await fetch(
          `${BASE_URL}/search/multi?query=${query}&page=1`,
          {
            ...options,
            signal,
          }
        );
        const data = await res.json();
        dispatch({
          type: "search/loaded",
          payload: { list: data.results },
        });
      } else {
        dispatch({ type: "search/cancel" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loading/finish" });
    }
  }

  const fetchMovie = useCallback(async function fetchMovie(id, type) {
    dispatch({ type: "movie/loading" });
    const res = await fetch(`${BASE_URL}/${type}/${id}`, options);
    const res2 = await fetch(`${BASE_URL}/${type}/${id}/videos`, options);
    const res3 = await fetch(`${BASE_URL}/${type}/${id}/credits`, options);
    const data = await res.json();
    const videos = await res2.json();
    const credits = await res3.json();
    dispatch({
      type: "movie/loaded",
      payload: { data, videos: videos?.results, actors: credits.cast },
    });
  }, []);
  return (
    <MoviesContext.Provider
      value={{
        trending,
        recommended,

        trendingLoading,
        recommendedLoading,

        bookmarked,
        addBookmark,
        removeBookmark,

        fetchMoviesOrSeries,

        movies,
        tv,

        searchedMovies,
        handleSearch,
        searchQuery,
        isSearching,

        fetchMovie,
        movie,
        movieLoading,
        movieVideos,
        movieActors,
        moviesLoading,
      }}>
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("movies context is outside MoviesProvider!");
  return context;
}
export { MoviesAndSeriesProvider, useMovies };

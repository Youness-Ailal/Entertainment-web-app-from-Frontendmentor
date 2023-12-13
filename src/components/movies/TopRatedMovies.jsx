import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function TopRatedMovies() {
  const { movies, fetchMoviesOrSeries } = useMovies();
  useEffect(() => {
    if (movies?.topRated.length) return;

    fetchMoviesOrSeries("movie", "top_rated");
  }, [fetchMoviesOrSeries, movies]);
  const { topRated: topRatedMovies } = movies;
  topRatedMovies.map(movie => {
    movie.type = "movie";
    return movie;
  });
  if (!topRatedMovies?.length) return null;
  return (
    <Section title="Top Rated" style={{ marginTop: "6rem" }}>
      <MoviesList movies={topRatedMovies} />
    </Section>
  );
}

export default TopRatedMovies;

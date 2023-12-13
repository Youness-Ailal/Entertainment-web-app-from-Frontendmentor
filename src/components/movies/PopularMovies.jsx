import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function PopularMovies() {
  const { movies, fetchMoviesOrSeries } = useMovies();

  useEffect(() => {
    if (movies?.popular.length) return;
    fetchMoviesOrSeries("movie", "popular");
  }, [fetchMoviesOrSeries, movies]);
  const { popular: popularMovies } = movies;
  popularMovies.map(movie => {
    movie.type = "movie";
    return movie;
  });
  if (!popularMovies?.length) return null;
  return (
    <Section title="Popular Movies">
      <MoviesList movies={popularMovies} />
    </Section>
  );
}

export default PopularMovies;

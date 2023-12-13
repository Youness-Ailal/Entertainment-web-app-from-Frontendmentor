import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function UpComingMovies() {
  const { movies, fetchMoviesOrSeries } = useMovies();
  useEffect(() => {
    if (movies?.upcoming.length) return;

    fetchMoviesOrSeries("movie", "upcoming");
  }, [fetchMoviesOrSeries, movies]);
  const { upcoming: upComingMovies } = movies;
  upComingMovies.map(movie => {
    movie.type = "movie";
    return movie;
  });
  if (!upComingMovies?.length) return null;
  return (
    <Section title="Upcoming Movies" style={{ marginTop: "6rem" }}>
      <MoviesList movies={upComingMovies} />
    </Section>
  );
}

export default UpComingMovies;

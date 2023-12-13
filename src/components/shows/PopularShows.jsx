import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function PopularShows() {
  const { tv, fetchMoviesOrSeries } = useMovies();
  useEffect(() => {
    if (tv?.popular.length) return;

    fetchMoviesOrSeries("tv", "popular");
  }, [fetchMoviesOrSeries, tv]);
  const { popular: popularShows } = tv;
  if (!popularShows?.length) return null;
  return (
    <Section title="Popular TV Shows">
      <MoviesList movies={popularShows} />
    </Section>
  );
}

export default PopularShows;

import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function TopRatedShows() {
  const { tv, fetchMoviesOrSeries } = useMovies();
  useEffect(() => {
    if (tv?.topRated.length) return;

    fetchMoviesOrSeries("tv", "top_rated");
  }, [fetchMoviesOrSeries, tv]);
  const { topRated } = tv;
  if (!topRated?.length) return null;
  return (
    <Section title="Top Rated TV Shows">
      <MoviesList movies={topRated} />
    </Section>
  );
}

export default TopRatedShows;

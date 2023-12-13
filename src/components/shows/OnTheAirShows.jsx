import Section from "../Section";
import MoviesList from "../MoviesList";
import { useMovies } from "../../context/MoviesAndSeriesProvider";
import { useEffect } from "react";
function OnTheAirShows() {
  const { tv, fetchMoviesOrSeries } = useMovies();
  useEffect(() => {
    if (tv?.onTheAir.length) return;

    fetchMoviesOrSeries("tv", "on_the_air");
  }, [fetchMoviesOrSeries, tv]);
  const { onTheAir } = tv;
  if (!onTheAir?.length) return null;
  return (
    <Section title="On The Air">
      <MoviesList movies={onTheAir} />
    </Section>
  );
}

export default OnTheAirShows;

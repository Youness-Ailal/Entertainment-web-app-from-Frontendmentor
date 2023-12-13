import { useMovies } from "../context/MoviesAndSeriesProvider";

import MoviesList from "./MoviesList";
import Section from "./Section";

function RecommandedMovies() {
  const { recommended } = useMovies();
  const recommanMovies = recommended?.map(movie => {
    movie.type = "movie";
    return movie;
  });

  return (
    <Section title={"Recommended for you"} style={{ marginTop: "6rem" }}>
      <MoviesList movies={recommanMovies} />
    </Section>
  );
}

export default RecommandedMovies;

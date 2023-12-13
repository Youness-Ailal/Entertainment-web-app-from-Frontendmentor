import { useMovies } from "../context/MoviesAndSeriesProvider";
import MoviesList from "./MoviesList";
import Section from "./Section";
function BookmarkedMovies() {
  const { bookmarked } = useMovies();
  const movies = bookmarked.filter(movie => movie.type === "movie");
  const shows = bookmarked.filter(movie => movie.type !== "movie");
  if (!movies.length && !shows.length)
    return <Section title={"No bookmarks yet!"} />;
  return (
    <>
      {movies.length > 0 && (
        <Section title={"Bookmarked Movies"}>
          <MoviesList movies={movies} />
        </Section>
      )}
      {shows.length > 0 && (
        <Section style={{ marginTop: "5rem" }} title={"Bookmarked TV Shows"}>
          <MoviesList movies={shows} />
        </Section>
      )}
    </>
  );
}

export default BookmarkedMovies;

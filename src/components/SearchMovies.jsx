import Search from "./Search";
import MainLayout from "../layouts/MainLayout";

import "../styles/App.scss";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import MoviesList from "./MoviesList";
import Section from "./Section";

function SearchPage() {
  const { searchedMovies } = useMovies();
  const resultNum = searchedMovies?.filter(movie => movie.backdrop_path);
  return (
    <Section title={`Found ${resultNum.length} results`}>
      <MoviesList movies={searchedMovies} />
    </Section>
  );
}

export default SearchPage;

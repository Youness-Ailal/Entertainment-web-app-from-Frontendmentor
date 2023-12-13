import MainLayout from "../layouts/MainLayout";
import Search from "../components/Search";
import PopularMovies from "../components/movies/PopularMovies";
import TopRatedMovies from "../components/movies/TopRatedMovies";
import UpComingMovies from "../components/movies/UpcomingMovies";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import SearchMovies from "../components/SearchMovies";

function MoviesPage() {
  const { isSearching } = useMovies();
  if (isSearching) {
    return (
      <MainLayout>
        <Search />
        <SearchMovies />
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Search />
      <PopularMovies />
      <TopRatedMovies />
      <UpComingMovies />
    </MainLayout>
  );
}

export default MoviesPage;

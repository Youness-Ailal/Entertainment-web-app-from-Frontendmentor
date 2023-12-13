import Search from "../components/Search";
import TrendingMovies from "../components/TrendingMovies";
import MainLayout from "../layouts/MainLayout";

import "../styles/App.scss";
import RecommandedMovies from "../components/RecommendMovies";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import SearchMovies from "../components/SearchMovies";

function HomePage() {
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
      <TrendingMovies />
      <RecommandedMovies />
    </MainLayout>
  );
}

export default HomePage;

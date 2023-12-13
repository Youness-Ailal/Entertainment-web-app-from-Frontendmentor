import BookmarkedMovies from "../components/BookmarkedMovies";
import Search from "../components/Search";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import MainLayout from "../layouts/MainLayout";
import SearchMovies from "../components/SearchMovies";

function Bookmarks() {
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
      <BookmarkedMovies />
    </MainLayout>
  );
}

export default Bookmarks;

import MainLayout from "../layouts/MainLayout";
import Search from "../components/Search";
import PopularShows from "../components/shows/PopularShows";
import TopRatedShows from "../components/shows/TopRatedShows";
import OnTheAirShows from "../components/shows/OnTheAirShows";
import SearchMovies from "../components/SearchMovies";
import { useMovies } from "../context/MoviesAndSeriesProvider";

function ShowsPage() {
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
      <TopRatedShows />
      <PopularShows />
      <OnTheAirShows />
    </MainLayout>
  );
}

export default ShowsPage;

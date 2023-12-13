import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/App.scss";
import { MoviesAndSeriesProvider } from "./context/MoviesAndSeriesProvider";

//pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import MoviesPage from "./pages/MoviesPage";
import ShowsPage from "./pages/ShowsPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <>
      <MoviesAndSeriesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />}></Route>
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/tv_shows/:id" element={<MoviePage />} />

            <Route path="/tv_shows" element={<ShowsPage />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MoviesAndSeriesProvider>
    </>
  );
}

export default App;

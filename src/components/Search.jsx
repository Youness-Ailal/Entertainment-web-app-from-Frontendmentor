/* eslint-disable react/prop-types */
import "../styles/Search.scss";

import { CiSearch } from "react-icons/ci";

import { useMovies } from "../context/MoviesAndSeriesProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const { searchedMovies, handleSearch } = useMovies();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();

    handleSearch(query, controller.signal);

    return () => controller.abort();
  }, [query]);

  return (
    <div className="search font-bg">
      <input
        onChange={e => {
          setQuery(e.target.value);
        }}
        value={query}
        type="text"
        placeholder={"Search for movies or TV series"}
      />
      <CiSearch className="search__icon" />
    </div>
  );
}

export default Search;

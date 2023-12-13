/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import MoviesListSkeleton from "./skeleton/MoviesListSkeleton";
import "../styles/Movies.scss";
import { Link } from "react-router-dom";

import { useMovies } from "../context/MoviesAndSeriesProvider";

const IMAGE_URL = "https://www.themoviedb.org/t/p/w780";
const IMAGE_URL_LOW = "https://www.themoviedb.org/t/p/w92";

function MoviesList({ movies }) {
  const { moviesLoading } = useMovies();

  if (moviesLoading) return <MoviesListSkeleton count={12} />;

  return (
    <ul className="recommend-list">
      {movies?.map(movie => {
        const {
          original_title,
          name,
          original_name,
          media_type: includedType,
          release_date: releaseDate,
          backdrop_path: backdropPath,
          poster_path: poster,
          vote_average: voteAverage,
          first_air_date: firstAirDate,
          type: addedType,
          id,
        } = movie;
        const type = includedType || addedType;
        movie.bookmark = movie?.bookmark ?? false;
        const title = original_title || name || original_name;
        const year = firstAirDate?.slice(0, 4) || releaseDate?.slice(0, 4);
        const image = `${IMAGE_URL}/${backdropPath}`;
        const imageLow = `${IMAGE_URL_LOW}/${backdropPath}`;
        const vote = voteAverage?.toFixed(1);

        const page = type === "movie" ? "movies" : "tv_shows";

        if (!id || !backdropPath || !poster) return null;
        return (
          <li key={id}>
            <Link to={`/${page}/${id}`}>
              <MovieCard
                title={title}
                year={year}
                type={type}
                vote={vote}
                image={image}
                imageLow={imageLow}
                movie={movie}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesList;

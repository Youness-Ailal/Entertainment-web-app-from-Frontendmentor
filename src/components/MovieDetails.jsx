import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import { useEffect, useState } from "react";

import { IoLogoYoutube } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";

import "../styles/MovieDetails.scss";
import BookmarkButton from "./BookmarkButton";
import Actors from "./Actors";
import MovieDetailsSkeleton from "./skeleton/MovieDetailsSkeleton";

const IMAGE_URL = "https://www.themoviedb.org/t/p/w780";
const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

function MovieDetails() {
  const {
    movie,
    fetchMovie,
    movieLoading,
    movieVideos,
    movieActors,
    bookmarked,
    addBookmark,
    removeBookmark,
  } = useMovies();
  const [bookmark, setBookmark] = useState(movie.bookmark);

  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const typeName = pathname.split("/")[1];
  const type = typeName == "movies" ? "movie" : "tv";
  useEffect(() => {
    fetchMovie(id, type);
  }, [id, type]);

  const {
    original_title,
    name,
    original_name,
    release_date: releaseDate,
    poster_path: poster,
    vote_average: voteAverage,
    vote_count: voteCount,
    first_air_date: firstAirDate,
    overview,
    genres,
    runtime,
    production_countries: countries,
  } = movie;
  movie.bookmark = movie?.bookmark ?? false;
  movie.type = type;
  const title = original_title || name || original_name;
  const year = firstAirDate?.slice(0, 4) || releaseDate?.slice(0, 4);
  const image = `${IMAGE_URL}/${poster}`;
  const vote = voteAverage?.toFixed(1);
  const trailerKey = movieVideos?.find(video => video.type === "Trailer")?.key;
  const videoLink = `${YOUTUBE_URL}${trailerKey}`;
  const hours = runtime / 60;
  const mins = runtime % 60;
  const movieTime = `${Math.floor(hours)}h ${mins}min`;

  bookmarked.forEach(bookmarked => {
    if (bookmarked.id === movie.id) {
      movie.bookmark = true;
    }
  });
  function handelBookmark(e) {
    e.preventDefault();
    movie.bookmark = !bookmark;
    if (movie.bookmark) {
      addBookmark(movie);
    } else {
      removeBookmark(movie);
    }
    setBookmark(prev => !prev);
  }
  if (movieLoading) return <MovieDetailsSkeleton />;
  return (
    <>
      <button onClick={() => navigate(-1)} className="details__back">
        <FaArrowLeft /> Go Back
      </button>
      <div className="details">
        <div className="details__left">
          <div className="details__img">
            <div className="details__bookmark">
              <BookmarkButton
                bookmark={movie.bookmark}
                movie={movie}
                onClick={handelBookmark}
              />
            </div>
            <img src={image} alt={`poster of ${title}`}></img>
          </div>
          {videoLink && (
            <a
              href={videoLink}
              target="_blank"
              className="details__trailer"
              rel="noreferrer">
              <IoLogoYoutube />
              Watch Trailer
            </a>
          )}
        </div>
        <div className="details__right">
          <h1 className="details__title">{title}</h1>
          <div className="details__overview">
            <p>{overview}</p>
          </div>
          <ul className="details__info">
            <li>
              <span>Rating</span>
              <p>
                {vote} <i>({voteCount?.toLocaleString()})</i>
              </p>
            </li>
            <li>
              <span>Release year</span>
              <p>{year}</p>
            </li>
            {genres && (
              <li>
                <span>Genres</span>
                <span>
                  {genres.map((el, i) => (
                    <p key={el.name}>
                      {el.name}
                      {i !== genres.length - 1 ? ", " : null}
                    </p>
                  ))}
                </span>
              </li>
            )}
            {countries && (
              <li>
                <span>Countries</span>
                <span>
                  {countries.map((el, i) => (
                    <p key={el.name}>
                      {el.name}
                      {i !== countries.length - 1 ? ", " : null}
                    </p>
                  ))}
                </span>
              </li>
            )}
            <li>
              <span>Duration</span>
              <p>{movieTime}</p>
            </li>
          </ul>
          <Actors actors={movieActors} />
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

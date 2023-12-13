/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import "../styles/Movies.scss";
import MovieInfo from "./MovieInfo";
import BookmarkButton from "./BookmarkButton";
import { useInView } from "react-intersection-observer";

function MovieCard({ movie, title, year, type, image, imageLow, vote }) {
  const { addBookmark, removeBookmark, bookmarked } = useMovies();
  const [bookmark, setBookmark] = useState(movie.bookmark);

  const { ref, inView } = useInView();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView && !loaded) setLoaded(true);
  }, [inView, loaded]);
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
  return (
    <article className="recommend-card">
      <div
        ref={ref}
        className="recommend-card__top"
        style={{ backgroundImage: `url(${loaded ? image : imageLow})` }}>
        <BookmarkButton onClick={handelBookmark} bookmark={movie.bookmark} />
      </div>
      <div className="recommend-card__bottom">
        <MovieInfo
          size={"md"}
          title={title}
          type={type}
          vote={vote}
          year={year}
        />
      </div>
    </article>
  );
}

export default MovieCard;

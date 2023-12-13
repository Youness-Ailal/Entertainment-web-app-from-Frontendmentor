/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import "../styles/TrendingMovies.scss";

import BookmarkButton from "./BookmarkButton";
import MovieInfo from "./MovieInfo";
import { useInView } from "react-intersection-observer";

function TrendingMovieCard({
  image,
  title,
  year,
  type,
  vote,
  movie,
  imageLow,
}) {
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
    <article
      ref={ref}
      className="trendincard"
      style={{ backgroundImage: `url(${loaded ? image : imageLow})` }}>
      <BookmarkButton onClick={handelBookmark} bookmark={bookmark} />
      <MovieInfo title={title} type={type} year={year} vote={vote} />
    </article>
  );
}

export default TrendingMovieCard;

import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { IoStar } from "react-icons/io5";

import "../styles/MovieInfo.scss";
function MovieInfo({ title, year, type, vote, size = "bg" }) {
  return (
    <div className="movie-info ">
      <ul className="font-sm">
        <li>{year}</li>
        <li>&bull;</li>
        {type === "movie" ? (
          <li>
            <MdLocalMovies /> Movie
          </li>
        ) : (
          <li>
            <PiTelevisionBold /> Tv Series
          </li>
        )}
        <li>&bull;</li>
        <li>
          <IoStar /> {vote}
        </li>
      </ul>
      <h3 className={`font-${size}`}>{title}</h3>
    </div>
  );
}

export default MovieInfo;

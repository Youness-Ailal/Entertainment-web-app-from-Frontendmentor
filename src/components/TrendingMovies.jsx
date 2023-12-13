import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "../styles/TrendingMovies.scss";

import Section from "./Section";
import TrendingMovieCard from "./TrendingMovieCard";
import { useMovies } from "../context/MoviesAndSeriesProvider";
import { Link } from "react-router-dom";
import TrendingSkeleton from "./skeleton/TrendingSkeleton";
import Skeleton from "react-loading-skeleton";

const IMAGE_URL = "https://www.themoviedb.org/t/p/w780";
const IMAGE_URL_LOW = "https://www.themoviedb.org/t/p/w92";

function TrendingMovies() {
  const { trending, bookmarked } = useMovies();
  if (trending.length > 0)
    return (
      <Section title="Trending">
        <Swiper slidesPerView={"auto"} spaceBetween={40}>
          {trending?.map(movie => {
            const {
              original_title: originalTitle,
              name: Moviename,
              original_name: originalName,
              media_type: type,
              release_date: releaseDate,
              backdrop_path: backdropPath,
              vote_average: voteAverage,
              first_air_date: firstAirDate,
              id,
            } = movie;

            movie.bookmark = false;
            if (bookmarked.length) {
              bookmarked.forEach(bookmark =>
                bookmark.id === movie.id ? (movie.bookmark = true) : null
              );
            }

            const title = originalTitle || Moviename || originalName;
            const year = firstAirDate?.slice(0, 4) || releaseDate?.slice(0, 4);
            const vote = voteAverage.toFixed(1);

            const page = type === "movie" ? "movies" : "tv_shows";

            const image = `${IMAGE_URL}/${backdropPath}`;
            const imageLow = `${IMAGE_URL_LOW}/${backdropPath}`;

            return year && title.length < 40 ? (
              <SwiperSlide className="swiper-slide" key={movie.id}>
                <Link to={`/${page}/${id}`} key={id}>
                  <TrendingMovieCard
                    title={title}
                    year={year}
                    vote={vote}
                    type={type}
                    image={image}
                    movie={movie}
                    imageLow={imageLow}
                  />
                </Link>
              </SwiperSlide>
            ) : null;
          })}
        </Swiper>
      </Section>
    );
  return (
    <Section title={"Trending"}>
      <TrendingSkeleton count={5} />
    </Section>
  );
}

export default TrendingMovies;

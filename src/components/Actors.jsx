/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "../styles/Actors.scss";

import avatar from "../assets/images/avatar.svg";
const IMAGE_URL = "https://www.themoviedb.org/t/p/w300";

function Actors({ actors }) {
  return (
    <div className="actors">
      <p className="actors__title">Top Billed Cast</p>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        loop={true}
        freeMode={true}>
        {actors.map(actor => {
          const { character, name, profile_path: profilePath, id } = actor;
          const profileImageSrc = profilePath
            ? `${IMAGE_URL}/${profilePath}`
            : avatar;
          return (
            <SwiperSlide className="swiper-slide-actor" key={id}>
              <div className="actor">
                <div className="actor__image">
                  <img src={profileImageSrc} alt={name} />
                </div>
                <p className="actor__name1">{character}</p>
                <p className="actor__name2">{name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Actors;

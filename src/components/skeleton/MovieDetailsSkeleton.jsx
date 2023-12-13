import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "../../styles/Skeleton.scss";
function MoviedetailsSkeleton() {
  return (
    <>
      <div className="detailsSkeleton__back">
        <Skeleton height={"100%"} width={"100%"} />
      </div>
      <div className="detailsSkeleton">
        <div className="detailsSkeleton__left">
          <div className="detailsSkeleton__img">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <div className="detailsSkeleton__trailer">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
        </div>
        <div className="detailsSkeleton__right">
          <div className="detailsSkeleton__title">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <div className="detailsSkeleton__overview">
            <div className="detailsSkeleton__overview--line">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__overview--line">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__overview--line">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__overview--line">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
          </div>
          <ul className="detailsSkeleton__info">
            <li>
              <Skeleton height={"100%"} width={"100%"} />
            </li>
            <li>
              <Skeleton height={"100%"} width={"100%"} />
            </li>
            <li>
              <Skeleton height={"100%"} width={"100%"} />
            </li>
            <li>
              <Skeleton height={"100%"} width={"100%"} />
            </li>
            <li>
              <Skeleton height={"100%"} width={"100%"} />
            </li>
          </ul>
          <div className="detailsSkeleton__actors--title">
            {" "}
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <div className="detailsSkeleton__actors">
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className="detailsSkeleton__actor">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviedetailsSkeleton;

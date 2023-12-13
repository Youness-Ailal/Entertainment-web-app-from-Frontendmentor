import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "../../styles/Skeleton.scss";
import Section from "../Section";
function TrendingSkeleton({ count }) {
  return (
    <div className="trendingSkeleton">
      {Array.from({ length: count }).map((el, i) => (
        <div key={i} className="trendingSkeleton__card">
          <Skeleton height={"100%"} width={"100%"} />
        </div>
      ))}
    </div>
  );
}

export default TrendingSkeleton;

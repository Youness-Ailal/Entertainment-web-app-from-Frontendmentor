import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "../../styles/Skeleton.scss";
function TrendingSkeleton({ count }) {
  return (
    <div className="listSkeleton">
      {Array.from({ length: count }).map((el, i) => (
        <div key={i} className="listSkeleton__card">
          <Skeleton height={"100%"} width={"100%"} />
        </div>
      ))}
    </div>
  );
}

export default TrendingSkeleton;

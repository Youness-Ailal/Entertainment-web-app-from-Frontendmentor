/* eslint-disable react/prop-types */
import { FaRegBookmark } from "react-icons/fa6"; // to bookmark
import { FaBookmark } from "react-icons/fa6"; //bookmarked

import "../styles/BookmarkButton.scss";
function BookmarkButton({ bookmark, onClick }) {
  return (
    <button onClick={onClick} className="bookmark-btn">
      {bookmark ? (
        <FaBookmark className="bookmark-btn__icon" />
      ) : (
        <FaRegBookmark className="bookmark-btn__icon" />
      )}
    </button>
  );
}

export default BookmarkButton;

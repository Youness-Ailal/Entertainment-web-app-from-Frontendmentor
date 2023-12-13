import { Link, NavLink } from "react-router-dom";

import { MdMovie } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";

import "../styles/SideBar.scss";
import manAvatar from "../assets/images/portrait-man.jpg";

function SideBar() {
  return (
    <aside className="sidebar">
      <Link to={"/"}>
        <MdMovie className="sidebar__logo" />
      </Link>
      <nav className="sidebar__links">
        <NavLink className="sidebar__link" to={"/"}>
          <IoGrid />
        </NavLink>
        <NavLink className="sidebar__link" to={"/movies"}>
          <MdLocalMovies />
        </NavLink>
        <NavLink className="sidebar__link" to={"/tv_shows"}>
          <PiTelevisionBold />
        </NavLink>
        <NavLink className="sidebar__link" to={"/bookmarks"}>
          <FaBookmark />
        </NavLink>
      </nav>
      <img
        src={manAvatar}
        alt="portrait man from freepik"
        className="sidebar__img"
      />
    </aside>
  );
}

export default SideBar;

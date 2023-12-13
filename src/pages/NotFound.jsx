import "../styles/NotFound.scss";
import MainLayout from "../layouts/MainLayout";
import { TbFaceIdError } from "react-icons/tb";

function NotFound() {
  return (
    <MainLayout>
      <div className="notfound">
        Page Not Found <TbFaceIdError className="notfound__icon" />{" "}
      </div>
    </MainLayout>
  );
}

export default NotFound;

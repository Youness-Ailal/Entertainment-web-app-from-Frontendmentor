import SideBar from "../components/SideBar";
import Container from "../components/Container";
function MainLayout({ children }) {
  return (
    <main className="main">
      <SideBar />
      <Container>{children}</Container>
    </main>
  );
}

export default MainLayout;

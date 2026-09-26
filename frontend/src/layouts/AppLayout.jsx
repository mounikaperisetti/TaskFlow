import { Outlet } from "react-router-dom";
import NavbarTemp from "../components/NavbarTemp";
import Footer from "../components/Footer";

function AppLayout({ theme, toggleTheme }) {
  return (
    <>
      <NavbarTemp theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
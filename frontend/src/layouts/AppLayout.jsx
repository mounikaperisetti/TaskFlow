import { Outlet } from "react-router-dom";
import NavbarTemp from "../components/NavbarTemp";
import Footer from "../components/Footer";

function AppLayout({ theme, toggleTheme }) {
  return (
    <div className="app-layout">
      <NavbarTemp
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
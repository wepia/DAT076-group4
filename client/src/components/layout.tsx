import '../css/main.css';
import { Outlet } from "react-router-dom"
import AppNavbar from './appnavbar';
import Footer from './footer';

function Layout() {
  return (
    <div>
      <AppNavbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;

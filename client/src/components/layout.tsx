import '../main.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
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

import './main.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Layout() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
        <Container>
          <Navbar.Brand>Athlete Assist</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="registration">Registration</Nav.Link>
              <Nav.Link href="history">History</Nav.Link>
              <Nav.Link href="login">Log in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />

      <footer className="footer text-center mt-auto bg-light text-muted">
        <Container>
          <Row>
            <Col>          
              <p>
                Contact info: <br />
                athlete@not.adomain <br />
                +46000000 <br />
                addressroad 265, Nowhere <br />
              </p>
            </Col>
            <Col>
              <p>some other footer information</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Layout;

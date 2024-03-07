import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
       <footer className="footer">
        <Container fluid>
          <Row className="text-center mt-auto bg-light text-muted p-4">
            <Col>          
              <p>
                Contact info: <br />
                athlete@not.adomain <br />
                +46000000 <br />
                addressroad 265, Nowhere <br />
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
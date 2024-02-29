import { Col, Container, Row } from "react-bootstrap";

function Login() {
    return(
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center">Login to Athlete Assist</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center">Access your volunteer assignments and schedules!</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Login;
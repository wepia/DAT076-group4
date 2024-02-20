import '../main.css';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import AddEventModel from '../components/add-event-model';

function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Container>
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center">Welcome to Athlete Assist</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={10}>
              <p className="mb-5 text-center">Athlete Assist aims to simplify and optimize the management of volunteers at sports events.
              This digital platform is designed to streamline the coordination of volunteer activities, ensuring the efficient
              utilization of human resources to meet the diverse needs of sports events. Join us in enhancing the volunteer
              experience and making a positive impact on the world of sports!</p>
            </Col>
          </Row>
      </Container>
      <Container>
        <Row className="justify-content-center text-center">
          <h2 className="mt-5">Event list</h2>
        </Row>
      </Container>
      <Container>
        <Row>

        </Row>
        <Row className="justify-content-center">
          <Col className="text-center mt-4">
            <Button variant="primary" onClick={handleShow}>Add event</Button>
          </Col>
        </Row>
      </Container>

      <AddEventModel 
        show={show} 
        handleClose={handleClose}
      />

    </div>
  );
}

export default Home;
import './main.css';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">Event Name</label>
              <input type="text" id="eventName" className="form-control" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="eventOrganizer" className="form-label">Organizer</label>
              <input type="text" id="eventOrganizer" className="form-control" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="eventDate" className="form-label">Date</label>
              <input type="date" id="eventDate" className="form-control" required/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Home;
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Event } from './eventView'

function EventCard(props: any) {
  return (
    <Card
      bg="white"
      text="black"
      style={{ width: '80rem' }}
      className="mb-4"
    >
          <Card.Header style={{backgroundColor:'lightblue'}}>
          <Container>
            <Row className="align-items-start">
              <Col>{props.Name}</Col>
              <Col xs="auto" className="d-flex justify-content-end">
              <Button variant="outline-light" className='py-0'>✖️</Button></Col>
            </Row>
          </Container>
            </Card.Header>
          <Card.Body>
            <Card.Title>{props.date}  </Card.Title>
            <Card.Text>
              {props.organizer}
          </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default EventCard;


export function EventItem({event, eventDeleted} : {event: Event, eventDeleted : () => void}) {
  async function deleteEvent(e :React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try{
      e.preventDefault();

      

      
      await axios.put("http://localhost:8080/schedule", {
        data: { id: event.id }, 
            });

     // await axios.put("http://localhost:8080/event/volunteer", {
      //      id: event.id 
      //      });
      update();
    } catch(e:any){
      if (e.status === 401) {
        setModalMessage("Need to be logged in");
        setShowModal(true);
      } else {
        setModalMessage(e.message);
        setShowModal(true);
      }
    }
  }
  async function deleteEvent(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      e.preventDefault();

      if(receiver === 'event'){
      await axios.delete("http://localhost:8080/" + receiver, {
        data: { id: event.id },
      });
    } else {
      await axios.delete("http://localhost:8080/schedule", {
        data: { id: event.id },
      });
    }

      update();
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Card
      bg="white"
      text="black"
      style={{ width: '80rem' }}
      className="mb-4"
    >
          <Card.Header style={{backgroundColor:'lightblue'}}>
          <Container>
            <Row className="align-items-start">
              <Col>{event.name}</Col>
              <Col xs="auto" className="d-flex justify-content-end">
                <Button variant="outline-light" className='py-0' onClick={e =>{deleteEvent(e)}}>✖️</Button></Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(event.date)}
          </Card.Title>
          <Card.Text>{event.organizer}</Card.Text>
        </Card.Body>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Card>
    );}
  } else {
    return (
      <Card bg="white" text="black" style={{ width: "80rem" }} className="mb-4">
        <Card.Header style={{ backgroundColor: "lightblue" }}>
          <Container>
            <Row className="align-items-start">
              <Col>{event.name}</Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(event.date)}
          </Card.Title>
          <Card.Text>{event.organizer}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
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

  async function deleteEvent() {
    try{
      await axios.delete('http://localhost:8080/event',
          {data: {id: event.id}}
        );
      eventDeleted(); //TODO only update
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  }

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
              <Button variant="outline-light" className='py-0' onClick={ev =>{ev.preventDefault(); deleteEvent()}}>✖️</Button></Col>
            </Row>
          </Container>
            </Card.Header>
          <Card.Body>
              <Card.Title>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(event.date)}</Card.Title>
            <Card.Text>
              {event.organizer}
          </Card.Text>
          </Card.Body>
        </Card>
      );
}
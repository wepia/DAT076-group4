import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";

interface Event {
  id: string;
  name: string;
  organizer: string;
  date: Date;
}

//TODO adapt so this component can be used for user specific list too, use a const set by some in params.
function EventView() {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const submitForm = () => {closeForm();
                            updateEvents();}
  
  useEffect(() => {
    updateEvents()
  },[]);

  async function updateEvents() {
    try {
      const response = await axios.get<Event[]>("http://localhost:8080/event");
      const newEvents: Event[] = response.data;
      newEvents.forEach((event : Event) => {
        event.date = new Date(event.date);
        if (typeof(event.id) !== "string" || typeof(event.name) !== "string" || typeof(event.organizer) !== "string") {
          console.log("Invalid response from server: " + event);
        }
      })
      setEventList(newEvents);
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
    <Container className="p-4">
      <Row>
        <EventList
          events = {eventList}
          update = {() => updateEvents()}
        />
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center mt-4">
          <Button variant="primary" onClick={openForm}>Add event</Button>
        </Col>
      </Row>
      <EventForm 
        visible = {showForm} 
        close = {closeForm}
        submit = {submitForm}
      />
    </Container>
  );
}

function EventList({events, update} : {events: Event[], update: ()=>void}){
  return (
    <ListGroup>
      {events.map((e: Event) => 
        <EventItem 
          key={e.id}
          event = {e} 
          eventDeleted = {() => update()}
          />
        )}
    </ListGroup>
  );
}


function EventItem({event, eventDeleted} : {event: Event, eventDeleted : () => void}) {

  async function deleteEvent() {
    console.log("deleteevent triggered");
    try{
      await axios.delete('http://localhost:8080/event',
          {data: {id: event.id}}
        );
      console.log("event deleted successfully");
      await eventDeleted(); //TODO only update

    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  }

  return (<ListGroup.Item>
          <div><h5>{event.name}</h5>
              <small>{event.date.toLocaleString()}</small>
              <CloseButton onClick = 
              {ev =>{ev.preventDefault(); deleteEvent()}}/>
          </div>
          <p className="mb-1">{event.organizer}</p>
        </ListGroup.Item>)
}

function EventForm({visible, close, submit} : {visible: boolean, close: () => void, submit: () => void}) {
  const [newName, setNewName] = useState<string>("");
  const [newOrganizer, setNewOrganizer] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");

  async function submitEvent (e : FormEvent) {
    try {
      e.preventDefault();
      await axios.post('http://localhost:8080/event',
        { 
          name : newName,
          organizer : newOrganizer,
          date : newDate
         }
      );
      submit();
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modal show={visible} onHide={close}>
        <Modal.Header>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => submitEvent(e)}>
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">Event Name</label>
              <input type="text" id="eventName" className="form-control" required 
                onChange={(e => {setNewName(e.target.value);})} />
            </div>
            <div className="mb-3">
              <label htmlFor="eventOrganizer" className="form-label">Organizer</label>
              <input type="text" id="eventOrganizer" className="form-control" required 
                onChange={(e => {setNewOrganizer(e.target.value);})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="eventDate" className="form-label">Date</label>
              <input type="date" id="eventDate" className="form-control" required 
                onChange={(e => {setNewDate(e.target.value);})}/>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={close}>Cancel</Button>
              <Button variant="primary" type="submit">Ok</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventView;
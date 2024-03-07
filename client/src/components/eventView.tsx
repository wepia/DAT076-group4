import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import EventForm from "./eventForm";
import EventList from "./eventList";

export interface Event {
  id: number;
  name: string;
  organizer: string;
  date: Date;
}

//TODO adapt so this component can be used for user specific list too, use a const set by some in params.
export default function EventView() {
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
        if (typeof(event.id) !== "number" || typeof(event.name) !== "string" || typeof(event.organizer) !== "string") {
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
        <Col className="mt-4" style={{textAlign: 'right'}}>
          <Button variant="outline-primary" size="lg" onClick={openForm}>Add event ➕</Button>
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





import axios, { AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import EventForm from "./eventForm";
import EventList from "./eventlist";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

export interface Event {
  id: string;
  name: string;
  organizer: string;
  date: Date;
}



//TODO adapt so this component can be used for user specific list too, use a const set by some in params.
export default function EventView({ page, receiver }: {page: string, receiver: string}) {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterDates, setFilterDates] = useState({
    startDate: "",
    endDate: "",
  });

  if (page === "home") {
    axios.defaults.withCredentials = false;
  } else {
    axios.defaults.withCredentials = true;

  }
  const navigate = useNavigate();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const submitForm = () => {
    closeForm();
    updateEvents();
  };

  useEffect(() => {
    updateEvents();
  }, []);

  async function updateEvents() {
    try {
      console.log("In update events")
      const response = await axios.get<Event[]>(
        "http://localhost:8080/" + receiver
      );
      const newEvents: Event[] = response.data;
      newEvents.forEach((event: Event) => {
        event.date = new Date(event.date);
        if (
          typeof event.id !== "string" ||
          typeof event.name !== "string" ||
          typeof event.organizer !== "string"
        ) {
          console.log("Invalid response from server: " + event);
        }
      });
      setEventList(newEvents);
    } catch (err: any) {
      if (err.response.status === 401) {
        navigate("/login");
      } else if (err.response) {
        console.log(err.response.status);
      } else if (err.request) {
        console.log("No response from server");
      } else {
        console.log(err);
      }
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let startDateParam = filterDates.startDate.length > 0 ? filterDates.startDate : new Date(0);
    let endDateParam = filterDates.endDate.length > 0 ? filterDates.endDate: new Date(8640000000000000);
    const response = await axios.put("http://localhost:8080/" + receiver, {
      startDate: startDateParam,
      endDate: endDateParam,
    });

    const filteredEvents: Event[] = response.data;
    filteredEvents.forEach((event: Event) => {
      event.date = new Date(event.date);
    });
    setEventList(filteredEvents);
  }

  if(page === 'profile') {
    if(receiver === "account") {
      return (
        <Container className="p-4">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <InputField
              label="Start date"
              type="date"
              id="startDate"
              name="startDate"
              required={false}
              setInputs={setFilterDates}
              inputs={filterDates}
            />
    
            <InputField
              label="Final Date"
              type="date"
              id="endDate"
              name="endDate"
              required={false}
              setInputs={setFilterDates}
              inputs={filterDates}
            />
    
            <button type="submit" className="btn btn-primary">
              Filter the events within a date interval
            </button>
          </Form>
          <Row>
            <EventList
              events={eventList}
              receiver={receiver}
              page={page}
              update={() => updateEvents()}
            />
          </Row>
        </Container>
      );
    } else {
  return (
    <Container className="p-4">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <InputField
          label="Start date"
          type="date"
          id="startDate"
          name="startDate"
          required={false}
          setInputs={setFilterDates}
          inputs={filterDates}
        />

        <InputField
          label="Final Date"
          type="date"
          id="endDate"
          name="endDate"
          required={false}
          setInputs={setFilterDates}
          inputs={filterDates}
        />

        <button type="submit" className="btn btn-primary">
          Filter the events within a date interval
        </button>
      </Form>
      <Row>
        <EventList
          events={eventList}
          receiver={receiver}
          page={page}
          update={() => updateEvents()}
        />
      </Row>
      <Row className="justify-content-center">
        <Col className="mt-4" style={{ textAlign: "right" }}>
          <Button variant="outline-primary" size="lg" onClick={openForm}>
            Create event ➕
          </Button>
        </Col>
      </Row>
      <EventForm visible={showForm} close={closeForm} submit={submitForm} />
    </Container>
  );}
  } else {
    return (
      <Container className="p-4">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <InputField
          label="Start date"
          type="date"
          id="startDate"
          name="startDate"
          required={false}
          setInputs={setFilterDates}
          inputs={filterDates}
        />

        <InputField
          label="Final Date"
          type="date"
          id="endDate"
          name="endDate"
          required={false}
          setInputs={setFilterDates}
          inputs={filterDates}
        />

        <button type="submit" className="btn btn-primary">
          Filter the events within a date interval
        </button>
      </Form>
      <Row>
        <EventList
          events={eventList}
          receiver={receiver}
          page = {page}
          update={() => updateEvents()}
        />
      </Row>
    </Container>
    )
  }
}

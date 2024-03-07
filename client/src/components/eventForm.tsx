import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";

export default function EventForm({visible, close, submit} : {visible: boolean, close: () => void, submit: () => void}) {
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
  



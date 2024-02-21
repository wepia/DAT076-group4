import axios from "axios";
import { FormEvent, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Event {
}

function AddEventModel(props : {show: boolean, handleClose: any}) {
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
      //TODO update event list
      props.handleClose();
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
      <Modal show={props.show} onHide={props.handleClose}>
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
              <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
              <Button variant="primary" type="submit">Ok</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddEventModel;
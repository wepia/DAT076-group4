import { Modal, Button } from "react-bootstrap";

function AddEventModel(props : {show: boolean, handleClose: any}) {

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">Event Name</label>
              <input type="text" id="eventName" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="eventOrganizer" className="form-label">Organizer</label>
              <input type="text" id="eventOrganizer" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="eventDate" className="form-label">Date</label>
              <input type="date" id="eventDate" className="form-control" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
          <Button variant="primary" onClick={props.handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEventModel;
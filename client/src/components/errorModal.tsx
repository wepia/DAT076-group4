import { Button, Modal } from "react-bootstrap";


function ErrorModal ({visible, message, page, close} : {visible: boolean, message: String, page: String, close: () => void}) {
  return(
    <div>
      <Modal show={visible} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{page} Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ErrorModal;
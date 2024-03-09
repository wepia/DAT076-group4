import React, { FormEvent, useState } from "react";
import "../css/RegistrationForm.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  async function logOut() {
    try {
      await axios.post("http://localhost:8080/account/logout");
      navigate("/home");

    } catch (e: any) {
      setModalMessage("Unsuccessful log out!");
      setShowModal(true);
      
    }
  }
  
  return (
    <div>
      <button onClick={() => logOut()}></button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logg out Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogOut;
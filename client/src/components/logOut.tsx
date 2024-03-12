import {useState } from "react";
import "../css/RegistrationForm.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./errorModal";

function LogOut() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeForm = () => setShowModal(false);

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
      <ErrorModal
        visible = {showModal}
        message = {modalMessage}
        page = "Log out"
        close={closeForm}
      />
    </div>
  );
}

export default LogOut;
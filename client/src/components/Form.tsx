import React, { FormEvent, useState } from "react";
import "../css/RegistrationForm.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import InputField from "./InputField";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

interface inputArguments {
  label: string;
  type: string;
  id: string;
  name: string;
  required: boolean;
}

function Form({ inputFields }: { inputFields: inputArguments[] }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    birthdate: null,
  });

  async function submitFunc(e: FormEvent) {
    e.preventDefault();
    if (inputs.password === inputs.confirm_password) {
      try {
        const response = await axios.post("http://localhost:8080/account", {
          userName: inputs.username,
          password: inputs.password,
          email: inputs.email,
          gender: inputs.gender,
          birth: inputs.birthdate,
        });

        setModalMessage("Account Registered Successfully!");
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 500) {
            setModalMessage(`Failed! Username or email is already registered.`);
          } else {
            setModalMessage(
              `Registration Failed! ${error.response.data.message}`
            );
          }
        } else if (error.request) {
          setModalMessage("Registration Failed! Network error.");
        } else {
          setModalMessage("Registration Failed! An error occurred.");
        }
      }
    } else {
      setModalMessage("Passwords didn't match!");
      setInputs({
        ...inputs,
        password: "",
        confirm_password: "",
      });
    }
    setShowModal(true);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitFunc(e);
        }}
        method="post"
      >
        {inputFields.map((e) => (
          <InputField
            key={e.id} // assuming name is unique for each input field
            label={e.name}
            type={e.type}
            id={e.name}
            name={e.name}
            required={e.required}
            setInputs={setInputs}
            inputs={inputs}
          />
        ))}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <footer />
    </div>
  );
}

export default Form;

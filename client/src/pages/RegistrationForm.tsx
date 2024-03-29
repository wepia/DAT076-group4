import React, { FormEvent, useState } from "react";
import "../css/RegistrationForm.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import InputField from "../components/InputField";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ErrorModal from "../components/errorModal";

function RegistrationForm() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeForm = () => setShowModal(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    birthdate: null,
  });

  async function handleSubmit(e: FormEvent) {
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

        if (response.status === 200) {
          setModalMessage("Account Registered Successfully!");
        } else {
          setModalMessage("Registration Failed!");
        }
      } catch (error : any) {
          if (error.response) {
            setModalMessage(`Registration Failed! ${error.response.data.message}`);
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
    <div className="mt-4">
      <form
        action="process_registration.php"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        method="post"
      >
        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <InputField
          label="Confirm Password"
          type="password"
          id="confirm_password"
          name="confirm_password"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <InputField
          label="Gender"
          type="text"
          id="gender"
          name="gender"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <InputField
          label="Birthdate"
          type="date"
          id="birthdate"
          name="birthdate"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <ErrorModal
        visible = {showModal}
        message = {modalMessage}
        page = "Registration"
        close = {closeForm}
      />

      <footer/>
    </div>
  );
}

export default RegistrationForm;



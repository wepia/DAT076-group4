import { FormEvent, useState } from "react";
import InputField from "../components/InputField";
import { Form, Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import e from "express";

function UserPage() {
  const [login, setlogin] = useState({
    username: "",
    password: "",
  });


  async function handleSubmit(e : FormEvent) {
    e.preventDefault();
  }
  return (
    <Container className="p-4">
        <Form onSubmit={(e) => handleSubmit(e)}>
      <InputField
        label="Username"
        type="text"
        id="username"
        name="username"
        required={true}
        setInputs={setlogin}
        inputs={login}
      />

      <InputField
        label="Password"
        type="password"
        id="password"
        name="password"
        required={true}
        setInputs={setlogin}
        inputs={login}
      />
      <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Form>

    </Container>
  );
}

export default UserPage;

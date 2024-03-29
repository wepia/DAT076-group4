import { Col, Container, Row } from "react-bootstrap";
import InputField from "../components/InputField";
import { FormEvent, useState } from "react";
import axios from "axios";
import ErrorModal from "../components/errorModal";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeForm = () => setShowModal(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/account/login", {
        username: inputs.username,
        password: inputs.password,
      });

      navigate("/profile")

    } catch (error : any) {
        if (error.response) {
          setModalMessage(`Login Failed! ${error.response.data.message}`);
        } else if (error.request) {
          setModalMessage("Login Failed! Network error.");
        } else {
          setModalMessage("Login Failed! An error occurred.");
        }

        if (error.response.status === 400) {
          setModalMessage("Invalid username or password");
          setInputs({
            username: "",
            password: "",
          });
        } else if (error.response.status === 401) {
          setModalMessage("Username or password is incorrect");
        }
        setShowModal(true);
    }
  }

  return(
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <h1 className="text-center">Login to Athlete Assist</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">Access your volunteer assignments and schedules!</p>
          </Col>
        </Row>
      </Container>

      <form
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
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          setInputs={setInputs}
          inputs={inputs}
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <ErrorModal
        visible = {showModal}
        message = {modalMessage}
        page = "Login"
        close = {closeForm}
      />
    </div>
  );
}

export default Login;
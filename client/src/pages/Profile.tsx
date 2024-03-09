import { FormEvent, useState } from "react";
import InputField from "../components/InputField";
import { Form, Container, Col, Row } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import e from "express";
import EventView from "../components/eventView";
import { useNavigate } from 'react-router-dom';
import LogOut from '../components/logOut';

function UserPage() {
  const [login, setlogin] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e : FormEvent) {
    e.preventDefault();
  }
  return (
    <div>
    <Container>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center">Your Profile Page</h2>
          </Col>
        </Row>
    </Container>
    <Container>
      <Row className="justify-content-center text-center">
        <h2 className="mt-5">Upcomming Events</h2>
      </Row>
    </Container>
    <Container>
     
      <EventView receiver='event' page='profile'/>

    </Container>
    <Container>
      <Row className="justify-content-center text-center">
        <h2 className="mt-5">Signed up Events</h2>
      </Row>
    </Container>
    <Container>
    <EventView receiver='account' page='profile'/>
    <LogOut />
    </Container>
   
  </div>
    );
}

export default UserPage;

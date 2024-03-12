import { FormEvent, useState } from "react";
import InputField from "../components/InputField";
import { Form, Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import e from "express";
import EventView from "../components/eventView";

function UserPage() {
  const [login, setlogin] = useState({
    username: "",
    password: "",
  });


  async function handleSubmit(e : FormEvent) {
    e.preventDefault();
  }
  return (
      
      <EventView/>
    );
}

export default UserPage;

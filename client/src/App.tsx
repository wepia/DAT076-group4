import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';


interface InputButton {
  label : string,
  type : string,
  id : string,
  name : string
}

function App() {
  return (
   <div>
    <Form />
   </div>
  );
}



function Form(){

  
 
  let userName : InputButton = {
    label : "Username",
    type  : "text",
    id    : "username",
    name  : "username"
  };

  let email : InputButton = {
    label : "Email",
    type  : "email",
    id    : "email",
    name  : "email"
  };

  let password : InputButton = {
    label : "Password",
    type  : "password",
    id    : "password",
    name  : "password"
  };

  let confirm_password : InputButton = {
    label : "Confirm Password",
    type  : "password",
    id    : "confirm_password",
    name  : "confirm_password"
  };

  const inputButtons : InputButton[] = [userName,email,password,confirm_password];
  
  

  return(
    <form>
    {inputButtons.map((input: InputButton) => 
      <InputButtonF 
       inputB = {input}>
        </InputButtonF>
      )}
      </form>
  );
}

function InputButtonF({inputB, children} : {inputB : InputButton, children ?: ReactNode}) {
  return(
    <div key = {inputB.id}>
    <label htmlFor={inputB.name}>{inputB.label}</label>
    <input type={inputB.type} id={inputB.id} name={inputB.name} required/>
    </div>
  )
}
export default App;

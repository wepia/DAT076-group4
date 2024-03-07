import Form from '../components/Form'

function Registration() {



      const inputFields = [
        { label: "Username" , type: "text", id: "username", name: "username", required: true },
        { label: "Email", type:"email", id:"email" ,name: "email", required: true },
        { label: "Password", type:"password", id:"password", name: "password", required: true },
        { label: "Confirm Password", type:"password", id:"confirm_password", name: "confirm_password", required: true },
        { label: "Gender", type:"text", id:"gender", name: "gender", required: true },
        { label: "Birthdate", type:"date", id:"birthdate", name: "birthdate", required: true }
      ];
    return(
        <Form inputFields={inputFields}/>
    );
}

export default Registration;

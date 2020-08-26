import React from "react";

import Form from "./components/Form/Form.js";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";

function App() {
  const submit = () => {
    console.log("submit")
  }

  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];
  
  return (
    <div className="App">
      <Form shouldValidateForm={true}>
        <TextInput type="textarea" id="email" label="Email address"/>
        <TextInput id="phone" label="phone" phoneNumber={true} validate={"phone"}/>
        <TextInput id="userName" validate={"required|numeric|email"} label="User name"/>
        <Dropdown id="dropdown" label="Dropdown" list={list}/>
        <Button onClick={submit} displayName="SUBMIT" size="medium"/>
      </Form>
    </div>
  );
}

export default App
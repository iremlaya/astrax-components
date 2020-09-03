import React, { useState, useEffect } from "react";

import Form from "../components/Form/Form.js";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Searchbar from "../components/Searchbar";
import HeaderText from "../components/HeaderText";
import Header from "../components/Header";
import FileSelector from "../components/FileSelector";
import ChoiceBox from "../components/ChoiceBox";
import Pagination from "../components/Pagination";


import {

  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom"


export const Demo = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData]= useState(null);
  const [formId, setFormId]= useState(null);
  const [children, setChildren] = useState(null);

  useEffect(() => {
      //window.JF.login();
  },[])

  useEffect(() => {
    if (formId) {
        setIsFetching(true);
        window.JF.getFormQuestions("202377427183053", (response) => {   
            setIsFetching(false);
            setFormData(response)
        });
    }
  }, [formId])

  useEffect(() => {
      if (formData) {
        const tempChildren = [];
        const newFormData = Object.values(formData);
        newFormData.sort(
            function(a, b) {          
               return parseInt(a.order) > parseInt(b.order) ? 1 : -1;
            });
        for (let index = 0; index < newFormData.length; index++) {
            const element = newFormData[index];
            const id = `${element.type}_${index}`
            if (element.type ==="control_head") {
                tempChildren.push(<HeaderText id={id} label={element.text}/>)
            } else if (element.type === "control_fullname") {
                console.log(element)
            } else if (element.type === "control_email") {
                
            } else if (element.type === "control_address") {
                
            } else if (element.type === "control_phone") {
                
            }else if (element.type === "control_dropdown") {
                
            }else if (element.type === "control_textbox") {
                
            }else if (element.type === "control_textarea") {
                
            }else if (element.type === "control_button") {
                
            }
            
        }
        setChildren(tempChildren);
      }
     
    
  }, [formData])

  const submitId = (data) => {
    console.log(data)
    //window.JF.login()
  }
  const submit =  (data) => {
    console.log(data)

  }
  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];
  const renderLogin = () => {

    return (
        <Form style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center",margin:"auto",paddingTop:"none"}} shouldValidateForm={true}>
            <TextInput id="jotform-id" label="Enter Jotform ID" validate={"numeric|required"}/>
            <Button onClick={(id) => setFormId(id)} displayName="SUBMIT" size="medium"/>
        </Form>
    )
  }
  const renderChildren = () => {
      return( children.map(child => <div>{child}</div>))
  }
  const renderForm = () => {
    return (
        <Form style={{paddingTop:"none"}} shouldValidateForm={true} >
                {renderChildren()}
                <HeaderText id="headertext" label="I'm Header" />
                <FileSelector id="fileSelector" label="File Select" />
                <TextInput type="textarea" id="email" label="Email address"/>
                <TextInput id="phone" label="phone" phoneNumber={true} validate={"phone"}/>
                <TextInput id="userName" validate={"required|numeric"} label="User name"/>
                <Dropdown id="dropdown" label="Dropdown" list={list}/>
                <Searchbar id="searchbar" label="Searchbar" list={list}/>
                <ChoiceBox id="choicebox" label="single choose" choices={list}/>
                <ChoiceBox id="choicebox1" label="multi choose" choices={list} multiple={true}/>
                <Button onClick={(data) => submit(data)} displayName="SUBMIT" size="medium"/>
            </Form>
    )
  }
  
  return (
      <div>
          {formData ? isFetching ? "loading" : children ? renderForm() : "loading": renderLogin()}
         
      </div>
       
  );
}

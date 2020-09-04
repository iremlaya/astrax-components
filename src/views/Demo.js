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

import './demo.scss';

const keys = ["c7e30e433971fbdc627e4ffe478a0095", "cdfd7881caa5b60de7278561c124747d"]



export const Demo = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData]= useState(null);
  const [formId, setFormId]= useState(null);
  const [children, setChildren] = useState(null);

  useEffect(() => {
      //window.JF.login();
      window.JF.initialize({apiKey: keys[0]})
  },[])

  useEffect(() => {
    if (formId) {
        const id = formId.fields["jotform-id"]["value"]
        console.log(id)
        setIsFetching(true);
        window.JF.getFormQuestions(id, (response) => {   
            
            setFormData(response);
            setIsFetching(false);
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

            const id = `${element.type}_${element.qid}`
            const req = element.required === "No" ? "" : "required";

            if (element.type ==="control_head") {
                tempChildren.push(<HeaderText id={id} label={element.text}/>)

            } else if (element.type === "control_fullname") {
                tempChildren.push(<TextInput id={id} validate={`${req}`} label={element.text}/>)
                
            } else if (element.type === "control_email") {
                tempChildren.push(<TextInput id={id} validate={`${req}|email`} label={element.text}/>)
            } else if (element.type === "control_address") {
                tempChildren.push(<TextInput type="textarea" id={id} validate={`${req}`} label={element.text}/>)
                
            } else if (element.type === "control_phone") {
                tempChildren.push(<TextInput id={id} phoneNumber={true} validate={`${req}|phone`} label={element.text}/>)
                
            }else if (element.type === "control_dropdown") {
              
              const optionsArr = element.options.split("|");
              const options = [];
              for (let i = 0; i < optionsArr.length; i++) {
                const option = {
                  id: i,
                  selected: false,
                  title: optionsArr[i]
                }
                options.push(option)
              }
              tempChildren.push(<Dropdown id={id} label={element.text} list={options} />)
            }else if (element.type === "control_textbox") {
              const isPhone = element.text === "Phone" ? true : false;
              tempChildren.push(<TextInput id={id} phoneNumber={isPhone} validate={`${isPhone ? "phone" : ""}|${req}`} label={element.text}/>)
                
            }else if (element.type === "control_textarea") {
              
              tempChildren.push(<TextInput type="textarea" id={id} validate={`${req}`} label={element.text}/>)

            }else if (element.type === "control_button") {
              tempChildren.push(<Button onClick={(data) => submit(data)} displayName={element.text} id={id} size="medium"/>)
                
            }else if (element.type === "control_fileupload") {
                tempChildren.push(<FileSelector id={id} label={`${element.text !== "" ? element.text : "File Select"}`} />)
            }else if (element.type === "control_radio") {
              const optionsArr = element.options.split("|");
              const options = [];
              for (let i = 0; i < optionsArr.length; i++) {
                const option = {
                  id: i,
                  selected: false,
                  title: optionsArr[i]
                }
                options.push(option)
              }
              tempChildren.push(<ChoiceBox id={id} label={element.text} choices={options}/>)
          }else if (element.type === "control_checkbox") {
            const optionsArr = element.options.split("|");
            const options = [];
            for (let i = 0; i < optionsArr.length; i++) {
              const option = {
                id: i,
                selected: false,
                title: optionsArr[i]
              }
              options.push(option)
            }
            tempChildren.push(<ChoiceBox id={id} label={element.text} choices={options} multiple={true}/>)
        }
            
            
        }
        setChildren(tempChildren);
      }
    
  }, [formData])
 

  const submit =  (data) => {
    const formData = data.fields;
    const submission = new Object();
    for (let [key, element] of Object.entries(formData)) {
      const idField = key.split('_');
      const qid = idField[2];
      //console.log(idField)
      //console.log(qid)
      submission[qid] = {}
      const type = [idField[0], "_", idField[1]].join("");
      if (element.value !== "") {
        if (type === "control_fullname") {
            
            const nameArr = element.value.split(" ");
            
            const obj = {
              "first":nameArr[0],
              "last":nameArr[nameArr.length - 1]
            }

            submission[qid] = (JSON.stringify(obj));
            
        } else if (type === "control_email") {
            submission[qid] = element.value;
        } else if (type === "control_address") {
          const addArr = element.value.split("\n");
          /*
          addr_line1: "Street Address"
          addr_line2: "Street Address Line 2"
          city: "City"
          country: "Country"*/
          submission[qid]['addr_line1'] = addArr[0];
          submission[qid]['addr_line2'] = addArr[1];
          submission[qid]['city'] = addArr[2];
          submission[qid]['country'] = addArr[3];
          submission[qid] = JSON.stringify(submission[qid]);
    
    
        } else if (type === "control_phone") {
          /*
          area": "Area Code",
          "phone": "Phone Number", */
          const telArr = element.value.split("-");
          submission[qid]['area'] = telArr[0];
          submission[qid]['phone'] = telArr[1];
            
        }else if (type === "control_dropdown") {
          submission[qid] = element.value;
        }else if (type === "control_textbox") {
          submission[qid] = element.value;
            
        }else if (type === "control_textarea") {
          submission[qid] = element.value;
          
    
        }else if (type === "control_button") {
            
        }else if (type === "control_fileupload") {
        }else if (type === "control_radio") {
          submission[qid] = element.value;
        }else if (type === "control_checkbox") {
        } 
      }
    
    }
    console.log(submission);

    const id = formId.fields["jotform-id"]["value"]
    setIsFetching(true);
    window.JF.createFormSubmission(id, submission, function(response){
      /**
       successful response including new submission
       .
       */
      setIsFetching(false);
      //window.open("https://github.com/iremlaya/custom-lib", "_blank")
      setChildren(null);
      setFormData(null);
  });
  }
  const renderLogin = () => {

    return (
        <Form style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center",margin:"auto",paddingTop:"0"}} shouldValidateForm={true}>
            <TextInput id="jotform-id" label="Enter Jotform ID" validate={"numeric|required"}/>
            <Button onClick={(id) => setFormId(id)} displayName="SUBMIT" size="medium"/>
        </Form>
    )
  }
  const renderChildren = () => {
      return( children.map(child =>  
      (<div className="form-row" style={{paddingTop:"none"}}>
      {child}
      </div>)))
  }
  const renderForm = () => {
    return (
        <Form style={{paddingTop:"none"}} shouldValidateForm={true} >
          {/*<Searchbar id="searchbar" label="Searchbar" list={list}/>*/}
          {renderChildren()}
        </Form>
    )
  }
  const renderLoading = () => (
    <div className="loader-container">
      <div class="loader" />
      <p className="loading-text">Loading...</p>
    </div>
    
  )
  
  return (
      <div>
        {isFetching ? renderLoading() : children ? renderForm() : renderLogin()} 
      </div>
       
  );
}

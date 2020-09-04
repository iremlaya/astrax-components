import React, { useState } from "react";

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

import ColorCard from "../components/ColorCard";
import Card from "../components/Card";
import TextCard from "../components/TextCard";
import Modal from "../components/Modal";
import Popup from "../components/Popup";



export const Home = () => {
  const [show,setShow] = useState(false);
  const showModal = e => {
    setShow(!show);
  };
  const [showP,setShowP] = useState(false);
  const showPopup = e => {
    setShowP(!showP);
  };
  
  const list = [
    { id: 0, title: 'Daisies', selected: false },
    { id: 1, title: 'Lilies', selected: false },
    { id: 2, title: 'Orchids', selected: false },
    { id: 2, title: 'Roses', selected: false },
  ];
  
  return (
    <div>

    <Form >

    <HeaderText id="ht" label="color palette."/>
    <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingBottom": "10vh"}}>
      <ColorCard id="cc" code="#BE52F2"/>
      <ColorCard id="cc" code="#DBA5F5"/>
      <ColorCard id="cc" code="#6979F8"/>
      <ColorCard id="cc" code="#1A051D"/>
      <ColorCard id="cc" code="#D0C9D6"/>
    </div>
    <HeaderText id="ht1" label="typography."/>
    <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingBottom": "10vh"}}>
      <TextCard id="cc" header="Heading 2" style={{
        "fontFamily": "SF Pro Display",
        "fontSize": "22px",
        "lineHeight": "28px",
      }}
      subheader="SF Pro Display SB, 22px L28"/>
      <TextCard id="cc" header="Body 1" style={{
        "fontFamily": "SF Pro Text",
        "fontSize": "15px",
        "lineHeight": "20px",
      }}
      subheader="SF Pro Text R, 15px L20"/>
    </div>
    <HeaderText id="bt" label="buttons."/>
      <div style={{"display": "flex", "flexDirection": "row", "paddingBottom": "10vh"}}>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between", "paddingRight":"20vh"}}>
          <Button ghost={true} size={"large"} displayName="ghost" onClick={()=>console.log("click")}/>
          <Button size={"large"} onClick={()=>console.log("click")}/>
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
          <Button ghost={true} size={"small"} displayName="ghost" onClick={()=>console.log("click")}/>
          <Button size={"small"} onClick={()=>console.log("click")}/>
        </div>
      </div>  
    <HeaderText id="if" label="input forms."/>
    <div style={{"display": "flex", "flexDirection": "row","paddingBottom": "15vh"}}>
        <div style={{"display": "flex", "flexDirection": "column", "paddingRight":"30vh","justifyContent": "space-between"}}>
          <TextInput id="tim" label="default"/>
          <TextInput id="tim0" error={true} errorText="this field is required"/>
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
          <TextInput id="tim1" type="textarea" label="text box"/>
          <TextInput id="tim2" basic={false}/>
        </div>
        
    </div>
    <div style={{"display": "flex", "flexDirection": "row", "paddingBottom": "10vh"}}>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between", "paddingRight":"30vh"}}>
          <Dropdown id="ddm"  label="dropdown" list={list}/>
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
          <Dropdown id="ddm1" label="multiselect" multiSelect={true} list={list}/>
        </div>
    </div>
    <div style={{"display": "flex", "flexDirection": "row", "paddingBottom": "10vh"}}>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between", "paddingRight":"24vh"}}>
          <ChoiceBox id="cbm"  style={{"width": "30vh"}} label="single choice list" choices={list}/>
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
          <ChoiceBox id="cbm1" style={{"width": "30vh"}} label="multi choice list" multiple={true} choices={list}/>
        </div>
    </div>
    <div style={{"paddingBottom": "10vh"}}>
      <Searchbar style={{"paddingBottom": "10vh"}} id="searchbar" label="Searchbar" list={list}/>
    </div>

    <HeaderText id="ifpc" label="cards."/>
    <div style={{"display": "flex", "flexDirection": "row", "paddingBottom": "10vh"}}>
      <div style={{"paddingRight":"22vh"}}>
        <Card id="pcm" header="Repetition" footer="Read more" coverLink="../assets/book1.jpg"
        link="https://www.nobelprize.org/prizes/literature/2019/handke/prose/"
        body="Alone during the day, in my room or out of doors, I thought аbout the waiter more than about my раrеnts"/>
      </div>
      <Card id="pcm1" header="Voices from Chernobyl" footer="Read more" coverLink="/home/irem/Desktop/jotform/custom-lib/src/assets/book2.jpg" 
      link="https://www.nobelprize.org/prizes/literature/2015/alexievich/prose/"
        body="There was a black cloud, and hard rain. The puddles were yellow and green, like someone had poured paint into them. They said it was dust from the flowers. Grandma made us stay in the cellar. She got down on her knees and prayed. And she taught us, too. “Pray! It’s the end of the world. It’s God’s punishment for our sins.” "/>
        
    </div>

    <HeaderText id="ifmd" label="modals."/>
    <div style={{"display": "flex", "flexDirection": "row", "paddingBottom": "10vh"}}>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between", "paddingRight":"37vh"}}>
          <Button  displayName="click me!" onClick={e => {
            showModal(e);
          }} />
          {show ? <Modal onClose={showModal} show={true} header="Allow Notifications" body="Allow notifications so we can keep you updated about newest features!" 
          footer="allow" footerAlt="don't allow"
          />
          : null}
          
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
          <Button displayName="...and me!"
          onClick={e => {
            showPopup(e);
          }}
          />
          {showP ? <Popup onClose={showPopup} show={true} body="Hey I just popped out here."
          />
          : null}
          
        </div>
      </div>  
    </Form>
    </div>
    
  );
}

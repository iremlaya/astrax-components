import React, { useEffect } from "react";

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

import TextCard from "../components/TextCard";




export const Home = () => {

  
  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];
  
  return (
    <div>

    <Form>

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
    
      <Searchbar id="searchbar" label="Searchbar" list={list}/>
    </Form>
    </div>
    
  );
}

import React, { useEffect } from "react";

import Header from "./components/Header";

import { Home } from './views/Home';
import { About } from './views/About';
import { Demo } from './views/Demo';

import {

  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";

function App() {

  const submit = (data) => {
    console.log(data)
    console.log("submit");
    //window.JF.login()
  }
  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];
  
  return (
    <Router>
        <div className="App">
            <Header label="Components Library" sublabel="by moi."/>
                <Switch>
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/">
                        <Redirect to="/Home" />
                    </Route>
                    <Route exact path="/About" component={About} />
                    <Route exact path="/Demo" component={Demo} />
                </Switch> 
        </div>
    </Router>
  );
}

export default App
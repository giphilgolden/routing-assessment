import React from 'react';
import './App.css';
import Welcome from "./components/welcome/Welcome";
import Clock from "./components/clock/Clock";
import Contact from "./components/contact/Contact";
import { Route,Switch } from 'react-router-dom';
import Navigation from "./components/navigation/Navigation"
import FourOhFour from "./components/FourOhFour/FourOhFour"

function App() {
  return (
    <div className="App">
      {/* <Welcome name="Davey" />
      <Clock />
      <Contact /> */}

        <Navigation />

      <Switch>

        <Route
          exact
          path="/"
          render={(props) => <Welcome {...props} name="Davey" />}
        />

        <Route
          exact
          path="/welcome/:name"
          render={(props) => <Welcome {...props} name={props.match.params.name} />}
        />

        <Route 
          exact
          path="/clock"
          component={Clock}
        />

        <Route 
          exact
          path="/contact"
          component={Contact}
        />

        <Route 
        component={FourOhFour}
        />

      </Switch>


    </div>

  );
}



export default App;

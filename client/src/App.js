import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bonsai from "./pages/Bonsai";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Switch>
          <Route exact path="/" render={props => <Bonsai {...props} day="Wednesday" />} />
          <Route exact path="/bonsais" component={Bonsai} />
          <Route exact path="/bonsais/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
  );
}

export default App;

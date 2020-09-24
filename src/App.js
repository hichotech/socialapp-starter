import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import MessageFeed from './pages/MessageFeed'
import Settings from './pages/Settings'

class App extends React.Component {
 


  
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/profile/:username"
          component={Profile}
        />
          <Route
          exact
          path="/registration"
          component={Registration}
        />
          <Route
          exact
          path="/messagefeed"
          component={MessageFeed}
        />
         <Route
          exact
          path="/settings"
          component={Settings}
        />
        <Route
          exact
          path="*"
          component={NotFound}
        />
      </Switch>
    );
  }
}

export default App;



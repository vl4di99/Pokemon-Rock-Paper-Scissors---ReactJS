import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartPage from "./StartPage";
import GamePage from "./GamePage";

import "./App.css";
import EndScreen from "./EndScreen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <StartPage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/score">
          <EndScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Index from '@/views/index/index.js'
import Home from '@/views/home/index.js'
class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route path="/index" exact component={Index} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

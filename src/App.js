import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Index from '@/containers/Index/index.tsx'
import Home from '@/views/home/index.tsx'
class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

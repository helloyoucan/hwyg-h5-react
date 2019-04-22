import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Index from '@/views/index/index.tsx'
import Home from '@/views/home/index.tsx'
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

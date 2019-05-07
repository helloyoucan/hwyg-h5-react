import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Index from '@/containers/Index/index'
// import Home from '@/views/home/index'
import AppMain from '@/components/layout/AppMain/index'
class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/main"   component={AppMain} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

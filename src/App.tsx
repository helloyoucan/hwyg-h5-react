import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from '@/views/home/index'
interface RouterItem {
  path: string,
  exact?: boolean,
  component: any,
  children?: Array<RouterItem>
}
interface Props {
  router: Array<any>
}
class App extends Component<Props, any> {
  render() {
    const router = this.props.router
    return (
      <BrowserRouter >
        <Switch>
          {
            router.map(item => (
              <Route key={item.path} path={item.path} exact={!!item.exact} render={() => {
                return (
                  <item.component>
                    <Switch>
                    {item.children ? (
                      item.children.map((item2: RouterItem) => {
                        return (<Route key={item2.path} path={item.path +'/'+ item2.path} exact={!!item2.exact} component={item2.component} />)
                      })
                    ) : undefined}
                    </Switch>
                  </item.component>
                )
              }} />
            ))
          }
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

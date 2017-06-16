import React, { Component } from 'react';
import { Route, BrowserRouter, Switch,  } from 'react-router-dom'
import './App.css';
import UserData from './UserData.jsx'
import Landing from './Landing.js'

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/:name' component={UserData} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

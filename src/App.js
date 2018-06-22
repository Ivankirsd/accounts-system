import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect, Switch } from 'react-router';

import AuthComponent from './Components/Auth/AuthComponent';
import HomeComponent from './Components/Home/HomeComponent';
import NotFoundComponent from './Components/404/NotFoundComponent';

import './App.css';

import AuthService from './Services/AuthService';



class App extends Component {
  render() {
    return (
            <Router>
                <Switch>
                    <Route path="/auth" component={AuthComponent} />
                    <PrivateRoute path="/" component={HomeComponent}/>
                    <Route component={NotFoundComponent} />
                </Switch>
            </Router>
    );
  }
}

export default App;


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.getLoginState() === true
            ? <Component {...props} />
            : <Redirect to='/auth' />
    )} />
)
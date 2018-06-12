import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect, Switch } from 'react-router';

import AuthComponent from './components/auth/auth-component';
import HomeComponent from './components/home/home-component';
import NotFoundComponent from './components/404/not-found-component';

import './App.css';

import AuthService from './services/auth-service';



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
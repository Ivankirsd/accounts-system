import React from 'react';
import { Redirect, Switch } from 'react-router';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './auth.css';

import AuthService from './../../services/auth-service';


export default class AuthComponent extends React.Component{
    constructor(props) {
        super (props);

        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(e){
        e.preventDefault();
        AuthService.login();
        this.props.history.push("/accounts");
    }

    render () {
        return (
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input  type="email" name="email" id="email" placeholder="Type Email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input  type="password" name="password" id="password" placeholder="Type Password"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="select-language">Select Language</Label>
                            <Input  type="select" name="select" id="select-language">
                                <option value="ru">Ru</option>
                                <option value="en">En</option>
                            </Input>
                        </FormGroup>
                        <Button onClick={this.loginHandler} className="w-100" color="primary">Enter</Button>
                    </Form>
                </div>

            </div>

        );
    }
}
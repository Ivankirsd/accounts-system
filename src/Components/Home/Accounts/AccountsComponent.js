import React from 'react';
import { Switch } from 'react-router';
import { Route } from "react-router-dom";

import { Table, Input, InputGroup, InputGroupAddon, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Label } from 'reactstrap';

import TvAccountsComponent from "./tv/TvAccountsComponent";
import MtAccountsComponent from "./mt/MtAccountsComponent";

export default class AccountsComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        // console.log(this.props);

        return (
            <div className="h-100">
                <p>AccountsComponent work</p>

                {/*<Redirect from="/accounts" to="/accounts/tv" />*/}
                <Switch>
                    <Route path="/accounts/tv" component={TvAccountsComponent} />
                    <Route path="/accounts/mt" component={MtAccountsComponent} />

                </Switch>
                {/*<p>AccountsComponent work</p>*/}
            </div>

        );
    }
}
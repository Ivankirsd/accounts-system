import React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from "react-router-dom";

import TvAccountsComponent from "./tv/tv-accounts-component";

export default class AccountsComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        console.log(this.props);

        return (
            <div>
                <p>AccountsComponent work</p>

                {/*<Redirect from="/accounts" to="/accounts/tv" />*/}
                <Switch>
                    <Route path="/accounts/tv" component={TvAccountsComponent} />
                </Switch>

            </div>

        );
    }
}
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect, Switch } from 'react-router';


import AccountsComponent from "./accounts/accounts-component";
import Navbar from "./bar/navbar";

import SidebarComponent from "./bar/sidebar";
import ReportsComponent from "./reports/reports-component";
import TvAccountsComponent from "./accounts/tv/tv-accounts-component";

export default class HomeComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        const { match, location, history } = this.props
        return (

            <div className="h-100">
                <Navbar className="row "/>
                <div className="row no-gutters h-100">
                    <div className="col-2">
                        <SidebarComponent match={match} location={location} history={history}/>
                    </div>
                    <div className="col-10">
                        <Switch>
                            <Route path="/accounts" component={AccountsComponent} >


                            </Route>
                            <Route path="/reports" component={ReportsComponent} />


                        </Switch>
                    </div>
                </div>
            </div>



        );
    }
}
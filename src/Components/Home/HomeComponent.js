import React from 'react';
import { Route } from "react-router-dom";
import { Redirect, Switch } from 'react-router';


import AccountsComponent from "./Accounts/AccountsComponent";
import NavbarComponent from "./Bars/NavbarComponent";

import SidebarComponent from "./Bars/SidebarComponent";
import ReportsComponent from "./Reports/ReportsComponent";

export default class HomeComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        const { match, location, history } = this.props
        return (

            <div className="h-100">
                <NavbarComponent className="row "/>
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
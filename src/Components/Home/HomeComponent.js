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

            <div className=" h-100">
                <div className=" nav-container row no-gutters">
                    <NavbarComponent />
                </div>

                <div className="home-component-wraper row no-gutters" >
                    <div className="col-2">
                        <SidebarComponent match={match} location={location} history={history}/>
                    </div>
                    <div className="col-10 h-100">
                        <Switch>
                            <Route path="/accounts" component={() => {return <AccountsComponent className="h-100 "/>}} />
                            <Route path="/reports" component={ReportsComponent} />


                        </Switch>
                    </div>
                </div>
                <div className="footer-container row no-gutters align-bottom justify-content-center">
                    <footer className="footer"><span>asdasd</span></footer>
                </div>

            </div>



        );
    }
}
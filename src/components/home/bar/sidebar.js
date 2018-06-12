import React from 'react';

import { Nav, NavItem, NavLink, Form, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import './sidebar.css'
import {routes} from "../../../router";

export default class SidebarComponent extends React.Component{
    constructor(props) {
        super (props);
    }


    render () {
        // console.log(this.props);
        switch (this.props.location.pathname) {
            case '/accounts':
            case '/accounts/tv':
            case '/accounts/mt':
            case '/accounts/wia':
                return (<SidebarAccounts/>);
                break;

            case '/reports':
                return (<SidebarReports/>);
                break;
            default:
                return (
                    <Nav className="sidebar flex-column h-100">
                        <NavItem className="">
                            <Link className="nav-link text-center " to="/" disabled><span>Side bar default!</span></Link>
                        </NavItem>
                    </Nav>
                );
                break;
        }



    }
}

const SidebarAccounts = () => (
    <Nav className="sidebar flex-column h-100">
        { routes.filter(route => route.parentComponent === 'AccountsComponent').map((route, i) =>
            <NavItem className="" key={i}>
                <Link className="nav-link text-center" to={route.path}>{route.name}</Link>
            </NavItem>
        )}
    </Nav>
);

const SidebarReports = () => (
    <Nav className="sidebar flex-column h-100">
        <NavItem className="">
            <Link className="nav-link text-center " to="/" disabled><span>Home</span></Link>
        </NavItem>

    </Nav>
);
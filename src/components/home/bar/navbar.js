import React from 'react';
import { Nav, NavItem, NavLink, Form, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from "react-router-dom";

import './navbar.css'

import { routes } from './../../../router';

import { MdSettings } from 'react-icons/lib/md/settings';
import MdAccountCircle  from 'react-icons/lib/md/account-circle';
import HomeComponent from "../home-component";



export default class Navbar extends React.Component{
    constructor(props) {
        super (props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render () {
        return (
            <div className="nav navbar-expand-lg justify-content-between">
                <Nav className="">
                     { routes.filter(route => route.parentComponent === 'HomeComponent').map((route, i) =>
                        <NavItem className="" key={i}>
                            <Link className="nav-link text-center" to={route.path}>{route.name}</Link>
                        </NavItem>
                     )}

                </Nav>
                <Nav >
                    <Form className="form-inline" >
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </Form>
                    <Dropdown className="nav-item" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle className="text-center" nav caret>
                            <MdAccountCircle className="icon"/>
                        </DropdownToggle>
                        <DropdownMenu className="" right>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>




            </div>
        );
    }
}
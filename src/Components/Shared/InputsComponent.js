import React from 'react';
import ReactDOM from 'react-dom';

import { Input, InputGroup, InputGroupAddon, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import './inputsComponent.css';

import ModalComponent from "./ModalComponent";


export default class InputsComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            dropdownOpen: false,
        }
    }

    clealFilterInput = (e) => {

        e.target.value = '';
        // console.log(e, this.refs);
        ReactDOM.findDOMNode(this.refs[this.props.id]).focus();

        return this.props.clearField(e)
    }


    toggle =(e) => {

        // console.log (e);
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });

    }

    render () {

        {switch (this.props.type) {
            case 'filter':
                return (
                        <InputGroup size="100%">
                        <Input
                            ref={this.props.id}
                            type="text"
                            id={this.props.id}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.props.filterData}
                        />

                        {this.props.value ?
                            (
                                <InputGroupAddon addonType="append">
                                    <Button
                                        id={this.props.id}
                                        onClick={this.clealFilterInput}
                                        color="link"
                                        outline
                                    >
                                        {this.props.icon}
                                    </Button>
                                </InputGroupAddon>
                            ) : ''
                        }

                    </InputGroup>
                )
                break;

            case 'button':
                return (
                    <Button
                        className="clear-all-field-button"
                        onClick={this.props.clearAllFilterFields}
                        color="link"
                        size="sm"
                        disabled={this.props.disabled}

                    >
                        {this.props.icon}
                    </Button>
                );
                break;
            case 'dropdown':

                return (
                    <Dropdown className="" isOpen={this.state.dropdownOpen} toggle={this.toggle} id={this.props.id}>
                        <DropdownToggle className="dropdown-toggle-class text-center" color="link">
                            {this.props.icon}
                        </DropdownToggle>
                        <DropdownMenu className="">
                            <DropdownItem onClick={this.props.modalopen} id={this.props.id}>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
                break;
            default:
                break;

        } }

        return (
            <p>InputsComponent works</p>
        );
    }
}
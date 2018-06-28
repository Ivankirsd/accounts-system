import React from 'react';
import { Switch } from 'react-router';
import { Route } from "react-router-dom";

import { Input, InputGroup, InputGroupAddon, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modalIsOpen,
        };

        console.log('modal state:', this.props.modalIsOpen)
    }

    componentWillUnmount() {
        this.props.modalclosed();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render () {
        // console.log(this.props);

        return (
            <div className="maodal-container">
                {/*<p>ModalComponent works</p>*/}

                {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
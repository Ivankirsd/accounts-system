import React from 'react';
import { Switch } from 'react-router';
import { Route } from "react-router-dom";

import { Form, FormGroup, Col, Input, InputGroup, InputGroupAddon, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modalIsOpen,
        };
        console.log('modal state:', this.props.modalIsOpen)
    }

    // componentWillUnmount() {
    //     this.props.modalclosed();
    // }

    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        });
        this.props.modalclosed(e);
    }

    render () {
        // console.log(this.props);

        switch (this.props.modalType) {
            case 'new':
                return (
                    <p>Modal open new user</p>
                )
                break;

            case 'edit':
                return (
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                {Object.keys(this.props.tableHeaders).map((tHeaderKey) => {
                                    return (
                                            <FormGroup className="no-gutters" row key={tHeaderKey}>
                                                <Label for="exampleEmail" sm={4}>{this.props.tableHeaders[tHeaderKey]}</Label>
                                                <Col sm={8}>
                                                    <Input
                                                        type="text"
                                                        id={tHeaderKey}
                                                        placeholder={tHeaderKey}
                                                        defaultValue={this.props.data[tHeaderKey]} />
                                                </Col>
                                            </FormGroup>
                                    )
                                })}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Ok</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                )
                break;
            default:
                break;
        }

        return (

                {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}


        );
    }
}
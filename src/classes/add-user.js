import React from 'react';

export default class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: 'sdasd',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({userName: event.target.value});

    }

    handleFormSubmit (e) {
        const {addUser} = this.props;
        const {userName} = this.state;

        addUser(userName);
        e.preventDefault();
        this.setState({userName: ''});

    }

    userNameInput(input) {
        // this.input = input;

        input.focus();
    }

    render () {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input ref={this.userNameInput} type="text" value={this.state.userName} onChange={this.handleChange} />
            </form>


        );
    }
}
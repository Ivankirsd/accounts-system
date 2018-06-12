import React from 'react';
import UsersList from './user-list'

import AddUser from './add-user'

import { Button } from 'reactstrap';

export default class MyClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {name: 'Pasha', id: 1},
                {name: 'Sasha', id: 2},
                {name: 'Wano', id: 3}
            ]

        };

        this.addUser = this.addUser.bind(this);
    }

    addUser(userName) {

        this.setState((state) => {
            const newUsers =  state.users.push({
                    name: userName,
                    id: Math.random()
                })

            return {
                newUsers
            }
        });
    }

    render() {
        return (
            <div>
                    <AddUser  addUser={this.addUser}/>

                    <UsersList users={this.state.users} ></UsersList>
                <Button color="danger">Button</Button>
            </div>
        );
    }
}
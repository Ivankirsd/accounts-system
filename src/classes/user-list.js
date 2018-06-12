import React from 'react';
import PropTypes from 'prop-types';


export default class UsersList extends React.Component {
    static defaultProps = {
        users: [],
    }

    static propTypes = {
        users: PropTypes.array
    }

    render() {
        return (

            <div>
                {
                    this.props.users.map((user) => {
                        return (
                            <div key={user.id}>
                                {user.name}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

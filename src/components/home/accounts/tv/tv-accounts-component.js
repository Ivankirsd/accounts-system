import React from 'react';
import TableComponent from "../../../shared/table";

export default class TvAccountsComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        // console.log(this.props)
        return (
            <p>TvAccountsComponent work</p>,
            <TableComponent/>
        );
    }
}
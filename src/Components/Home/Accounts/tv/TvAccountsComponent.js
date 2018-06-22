import React from 'react';
import TableComponent from "../../../Shared/TableComponent";

import tvAccounts from './../../../../Constans/TableData';


export default class TvAccountsComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        // console.log(this.props)
        return (
            <p>TvAccountsComponent work</p>,
            <TableComponent data={tvAccounts}/>
        );
    }
}
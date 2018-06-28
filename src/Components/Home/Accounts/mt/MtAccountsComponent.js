import React from 'react';
import TableComponent from "../../../Shared/TableComponent";

import tvAccounts from '../../../../Constans/TableData';


export default class MtAccountsComponent extends React.Component{
    constructor(props) {
        super (props);
    }

    render () {
        // console.log(this.props)
        return (
            <p>MtAccountsComponent work</p>,
            <TableComponent className="h-100" data={tvAccounts}/>
        );
    }
}
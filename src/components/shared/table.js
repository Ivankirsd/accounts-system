import React from 'react';
import { Table, Input } from 'reactstrap';

import tvAccounts from './../../constans/table-data';


export default class TableComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            tableHeaders : tvAccounts.headers,
            tableData : tvAccounts.data,
            vaulesCategoriesFields: this.filterCategoriesParser(tvAccounts.headers), //{filterFieldId: fieldValue, ...}
        };

        this.handleFilterData = this.handleFilterData.bind(this);
    }


    handleFilterData(e) {

        let cangedFilterCatigoryField = {};
        cangedFilterCatigoryField[e.target.id] = e.target.value;

        this.setState({
            vaulesCategoriesFields: Object.assign(this.state.vaulesCategoriesFields, cangedFilterCatigoryField)
        });

        // console.log(this.state.vaulesCategoriesFields);

        this.setState({
            tableData: tvAccounts.data.filter((data) => {

                return Object.keys(this.state.vaulesCategoriesFields).filter((keyCategory) => {
                    return this.state.vaulesCategoriesFields[keyCategory]   // return not empty category field value
                }).every((keyCategory) => {
                    return data[keyCategory].toLowerCase().indexOf(this.state.vaulesCategoriesFields[keyCategory].toLowerCase()) > -1
                });
            })
        })
    };

    filterCategoriesParser(data) {
        let filterCategories = {};
        Object.keys(data).map((key) => { filterCategories[key]= '' });
        return filterCategories;
    }

    render () {
        return (
            <Table striped bordered>
                <thead>
                <tr>
                    <th>#</th>

                    {Object.keys(this.state.tableHeaders).map((tHeaderKey) => {
                            return <th key={tHeaderKey}>{this.state.tableHeaders[tHeaderKey]}</th>
                     })}
                </tr>
                </thead>

                <tbody>
                <tr >
                    <th scope="row">1</th>

                    {Object.keys(this.state.tableHeaders).map((tHeaderKey) => {
                        return <th key={tHeaderKey}>
                            <Input type="text" name={`filter-by-${tHeaderKey}`} id={tHeaderKey} placeholder={this.state.tableHeaders[tHeaderKey]}  onChange={this.handleFilterData}/>
                        </th>})}
                </tr>

                {this.state.tableData.map((tRow, indexRow) => {
                    return (
                        <tr key={indexRow}>{Object.keys(tRow).map((tRowKey,index) => {
                                return (
                                    tRowKey ==='id'? <th scope="row" key={tRowKey + 1}>{indexRow + 1}</th> : <td key={index}>{tRow[tRowKey]}</td>
                                )
                        })}</tr>
                    )
                })}

                </tbody>
            </Table>

        );
    }
}
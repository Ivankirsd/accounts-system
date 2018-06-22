import React from 'react';
import ReactDOM from 'react-dom';

import { Table, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

import tvAccounts from '../../Constans/TableData';

import { MdClear, MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/lib/md';



export default class TableComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            tableHeaders : tvAccounts.headers,
            tableData : tvAccounts.data,
            vaulesCategoriesFields: this.filterCategoriesParser(tvAccounts.headers), //{filterFieldId: fieldValue, ...}
            sortOptions : {
                sortField: this.filterCategoriesParser(tvAccounts.headers)[0], //'',
                sortType: 'ASC',
                ASC: (a, b, sortField) => {
                    // console.log(a, b);

                    if (a[this.state.sortOptions.sortField] > b[this.state.sortOptions.sortField]) {
                        return 1;
                    }
                    if (a[this.state.sortOptions.sortField] < b[this.state.sortOptions.sortField]) {
                        return -1;
                    }
                    return 0;
                },
                DESC: (a, b, sortField) => {
                    if (a[this.state.sortOptions.sortField] < b[this.state.sortOptions.sortField]) {
                        return 1;
                    }
                    if (a[this.state.sortOptions.sortField] > b[this.state.sortOptions.sortField]) {
                        return -1;
                    }
                    return 0;
                },

            }
        };
    }


    handleFilterData = (e) => {

        let changedFilterCategoryField = {};
        changedFilterCategoryField[e.target.id] = e.target.value;

        this.setState({
            vaulesCategoriesFields: Object.assign(this.state.vaulesCategoriesFields, changedFilterCategoryField)
        });

        // console.log(this.state.vaulesCategoriesFields);

        this.setState({
            tableData: tvAccounts.data.filter((data) => {

                return Object.keys(this.state.vaulesCategoriesFields).filter((keyCategory) => {
                    return this.state.vaulesCategoriesFields[keyCategory]   // return not empty category field value
                }).every((keyCategory) => {
                    return data[keyCategory].toLowerCase().indexOf(this.state.vaulesCategoriesFields[keyCategory].toLowerCase()) > -1
                });
            }).sort(this.state.sortOptions[this.state.sortOptions.sortType])
        })
    };


    clearSearchField = (e) => {
        let changedFilterCategoryField = {};
        changedFilterCategoryField[e.target.id] = '';
        e.target.value = '';

        // console.log('clear',e.target.id, this.state.vaulesCategoriesFields)
        this.setState({
            vaulesCategoriesFields: Object.assign(this.state.vaulesCategoriesFields, changedFilterCategoryField)
        });

        // console.log('input: ',this.refs)
        ReactDOM.findDOMNode(this.refs[e.target.id]).focus();

        return this.handleFilterData(e);
    }


    handleOnClickSort = (e) => {

        let sortOptions = this.state.sortOptions;

        if (e.target.id) {
            if (sortOptions.sortField !== e.target.id ) {

                sortOptions.sortField = e.target.id;
                sortOptions.sortType = 'ASC';

                this.setState({sortOptions : sortOptions});

            } else if (sortOptions.sortField === e.target.id) {
                if (sortOptions.sortType === '' || sortOptions.sortType === 'DESC') {
                    sortOptions.sortType = 'ASC';

                    this.setState({sortOptions : sortOptions});
                } else if (sortOptions.sortType === 'ASC') {
                    sortOptions.sortType = 'DESC';

                    this.setState({sortOptions : sortOptions});
                }
            }
        }
        this.sortTableData();
    }

    sortTableData = () => {
        let tableDate = this.state.tableData.sort(this.state.sortOptions[this.state.sortOptions.sortType]);
        this.setState( {
            tableData: tableDate,
        });
        // console.log('tableData: ', this.state.tableData.sort(this.state.sortOptions[this.state.sortOptions.sortType]))
    }


    filterCategoriesParser(data) {
        let filterCategories = {};
        Object.keys(data).map((key) => { filterCategories[key]= '' });
        return filterCategories;
    }

    handleInputAutoFocus = (e, categoryField) => {

        console.log('handleInputAutoFocus: ', categoryField , '/', e)

        if (e.target.id === categoryField) {
            return true;
        }
        return false;
    }

    render () {
        return (
            <Table striped bordered>
                <thead>
                <tr onClick={this.handleOnClickSort}>
                    <th>#</th>

                    {Object.keys(this.state.tableHeaders).map((tHeaderKey) => {
                            return (<th id={tHeaderKey} key={tHeaderKey}>
                                        {this.state.tableHeaders[tHeaderKey]}
                                    {this.state.sortOptions.sortType ?
                                        (this.state.sortOptions.sortField === tHeaderKey ?
                                            (this.state.sortOptions.sortType === 'ASC' ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowUp/>)
                                            ) : ""
                                        )
                                        : ""
                                    }
                                    </th>)
                     })}
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th scope="row">1</th>

                    {Object.keys(this.state.tableHeaders).map((tHeaderKey) => {
                        return <th key={tHeaderKey}>
                            <InputGroup size="100%">
                                <Input
                                    ref={tHeaderKey}
                                    type="text"
                                    name={`filter-by-${tHeaderKey}`}
                                    id={tHeaderKey}
                                    placeholder={this.state.tableHeaders[tHeaderKey]}
                                    value={this.state.vaulesCategoriesFields[tHeaderKey]}
                                    onChange={this.handleFilterData}
                                />

                                {this.state.vaulesCategoriesFields[tHeaderKey] ?
                                    (
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                type="submit"
                                                id={tHeaderKey}
                                                onClick={this.clearSearchField}
                                                color="link"
                                                outline
                                            >
                                                <MdClear id={tHeaderKey}/>
                                            </Button>
                                        </InputGroupAddon>
                                    ) : ''
                                }

                            </InputGroup>
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
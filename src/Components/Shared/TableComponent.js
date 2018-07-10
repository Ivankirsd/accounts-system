import React from 'react';

import { Table, Input, FormGroup, Label, InputGroupAddon, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, ButtonDropdown } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './tableComponent.css';

import { MdClear, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSettings } from 'react-icons/lib/md';
import InputsComponent from "./InputsComponent";
import ModalComponent from "./ModalComponent";



export default class TableComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            tableHeaders : this.props.data.headers,
            tableData : this.props.data.data,
            vaulesCategoriesFields: this.filterCategoriesParser(this.props.data.headers), //{filterFieldId: fieldValue, ...}
            sortOptions : {
                sortField: Object.keys(this.filterCategoriesParser(this.props.data.headers))[0],
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

            },
            clearAllSearshFieldButtonDisabled: true,
            paginatorCurrentPage: 1,
            paginatorPerPageValue: 10,
            modal: false,
            currentData: {},
        };
    }


    handleFilterData = (e) => {

        let lenghtDataOld = this.state.tableData.length;
        let lenghtDataNew ;

        // console.log(this.state.vaulesCategoriesFields);
        let changedFilterCategoryField = {};
        changedFilterCategoryField[e.target.id] = e.target.value;


        this.setState({
            vaulesCategoriesFields: Object.assign(this.state.vaulesCategoriesFields, changedFilterCategoryField)
        });

        // console.log(this.state.vaulesCategoriesFields);

        let notEmptyCategoriesFields = Object.keys(this.state.vaulesCategoriesFields).filter((keyCategory) => {
            return this.state.vaulesCategoriesFields[keyCategory]   // return not empty category field value
        })
        // console.log(notEmptyCategoriesFields);

        if (notEmptyCategoriesFields.length > 0) {
            let tableDataNew = this.props.data.data.filter((data) => {
                return notEmptyCategoriesFields.every((keyCategory) => {
                    return data[keyCategory].toLowerCase().indexOf(this.state.vaulesCategoriesFields[keyCategory].toLowerCase()) > -1
                });
            })
            lenghtDataNew = tableDataNew.length;

            this.setState({
                clearAllSearshFieldButtonDisabled: false,
                tableData: tableDataNew,
            })
        } else {
            this.setState({
                clearAllSearshFieldButtonDisabled: true,
                tableData: this.props.data.data     //.sort(this.state.sortOptions[this.state.sortOptions.sortType])
            })
            lenghtDataNew = this.props.data.data.length;
        }

        // console.log('lenghtDataOld:', lenghtDataOld)
        // console.log('lenghtDataNew:', lenghtDataNew)
        if (lenghtDataOld !== lenghtDataNew) {

            this.setState({
                paginatorCurrentPage: 1,
            });
        }


    };


    clearFilterField = (e) => {

        // console.log('clear',e.target.id, this.state.vaulesCategoriesFields)

        let changedFilterCategoryField = {};
        changedFilterCategoryField[e.target.id] = '';

        // console.log('clear',e.target.id, this.state.vaulesCategoriesFields)
        this.setState({
            vaulesCategoriesFields: Object.assign(this.state.vaulesCategoriesFields, changedFilterCategoryField)
        });

        return this.handleFilterData(e);
    }


    clearAllFilterFields = (e) => {
        this.setState({
            vaulesCategoriesFields: this.filterCategoriesParser(this.props.data.headers),
            tableData : this.props.data.data,       //.sort(this.state.sortOptions[this.state.sortOptions.sortType]),
            clearAllSearshFieldButtonDisabled: true,
        });
    }


    handleChangeSort = (e) => {

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
    }


    filterCategoriesParser(data) {
        let filterCategories = {};
        Object.keys(data).map((key) => { filterCategories[key]= '' });
        return filterCategories;
    }


    handleChangePaginatorPerPageValue = (e) => {

        // console.log('handleChangePaginatorPerPageValue: ', e.target.value)
        this.setState({
            paginatorCurrentPage: 1,
            paginatorPerPageValue: Number(e.target.value)
        });
    }

    handleChangePaginatorPage = (e) => {
        // console.log('handleChangePaginatorPage: ', e.target.id, ":",e.target.parentNode.id);

        switch (e.target.id || e.target.parentNode.id) {
            case 'previous':
                if (this.state.paginatorCurrentPage !== 1) {
                    this.setState({
                        paginatorCurrentPage: this.state.paginatorCurrentPage - 1,
                    });
                }
                break;

            case 'next':
                if (this.state.paginatorCurrentPage !== Math.ceil(this.state.tableData.length / this.state.paginatorPerPageValue)) {
                    this.setState({
                        paginatorCurrentPage: this.state.paginatorCurrentPage + 1,
                    });
                }
                break;
            default :
                this.setState({
                    paginatorCurrentPage: Number(e.target.id)
                });
                break;
        }
    }


    toggleModalOpen =(e) => {
        // debugger;
        if (!this.state.modal) {
            // console.log('Modal open', e)
            console.log('e.target.id', e.target)
            this.setState({
                currentData: this.state.tableData.find((data) => {return data.id === Number(e.target.id)}),
            });
            // console.log(this.state.tableData.find((data) => {return data.id === Number(e.target.id)}))

        }
        this.setState({
            modal: !this.state.modal
        });
    }

    render () {
        const { tableData, paginatorCurrentPage, paginatorPerPageValue, sortOptions } = this.state;


        const indexOfLastTodo = paginatorCurrentPage * paginatorPerPageValue;
        const indexOfFirstTodo = indexOfLastTodo - paginatorPerPageValue;
        const currentTableData = tableData.sort(sortOptions[sortOptions.sortType]).slice(indexOfFirstTodo, indexOfLastTodo);

        // console.log(indexOfFirstTodo, indexOfLastTodo)

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.tableData.length / paginatorPerPageValue); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <PaginationItem  key={number} id={number} active={paginatorCurrentPage === number ? true : false}>
                    <PaginationLink id={number}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });

        return (
            <div className="table-container h-100" >
                {this.state.modal ?
                    <ModalComponent
                        modalIsOpen={this.state.modal}
                        modalclosed={this.toggleModalOpen}
                        modalType="edit"
                        data={this.state.currentData}
                        tableHeaders={this.state.tableHeaders}
                    /> : '' }

                <Table className="h-100 table no-gutters" striped bordered responsive size="sm">
                        <thead className="row no-gutters fixed-top">
                        <tr onClick={this.handleChangeSort}>
                            <td className="options"></td>
                            <th className="row-index">#</th>

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
                        <tr>
                            <td className="options">
                                <InputsComponent
                                    type="button"
                                    clearAllFilterFields={this.clearAllFilterFields}
                                    disabled={this.state.clearAllSearshFieldButtonDisabled}
                                    icon={ <MdClear id="clear-all"/> }
                                />
                            </td>
                            <th className="row-index" scope="row"></th>

                            {Object.keys(this.state.tableHeaders).map((tHeaderKey) => {
                                return <th key={tHeaderKey}>

                                    <InputsComponent
                                        type="filter"
                                        id={tHeaderKey}
                                        placeholder={this.state.tableHeaders[tHeaderKey]}
                                        value={this.state.vaulesCategoriesFields[tHeaderKey]}
                                        filterData={this.handleFilterData}
                                        clearField={this.clearFilterField}
                                        icon={<MdClear id={tHeaderKey}/>}
                                    />
                                </th>})
                            }
                        </tr>
                        </thead>

                    {/*<div className="row tbody no-gutters">*/}
                        <tbody className="row tbody no-gutters">


                        {/*{this.state.tableData.sort(this.state.sortOptions[this.state.sortOptions.sortType]).map((tRow, indexRow) => {*/}
                        {currentTableData.map((tRow, indexRow) => {

                            return (
                                <tr key={indexRow}>
                                    <td key={1} className="options">
                                        <InputsComponent type="dropdown" icon={<MdSettings className=""/>} id={tRow.id} modalopen={this.toggleModalOpen}/>
                                    </td>
                                    {Object.keys(tRow).map((tRowKey,index) => {
                                        return ( tRowKey ==='id'? (<th className="row-index" scope="row" key={tRowKey + 1 + indexOfFirstTodo}>{indexRow + 1 + indexOfFirstTodo}</th>) : <td key={index}>{tRow[tRowKey]}</td> )
                                    })}

                                </tr>

                            )


                        })}
                        </tbody>
                    {/*</div>*/}

                </Table>

                <div className="pagination-container no-gutters justify-content-center row" >
                    <div className="pagination">
                        <Pagination id="pagination" className="justify-content-center"
                                    aria-label="Page navigation example"
                                    size="sm"
                                    onClick={this.handleChangePaginatorPage}>
                            <PaginationItem id="previous" disabled={paginatorCurrentPage === 1 ? true : false}>
                                <PaginationLink id="previous" previous/>
                            </PaginationItem>

                            {renderPageNumbers}

                            <PaginationItem id="next" disabled={paginatorCurrentPage === pageNumbers.length ? true : false} className="next">
                                <PaginationLink id="next" next />
                            </PaginationItem>
                        </Pagination>
                    </div>
                    <div className="page-info">
                        <span>Показано с {indexOfFirstTodo + 1} по {this.state.tableData.length > indexOfLastTodo ? indexOfLastTodo : this.state.tableData.length} из {this.state.tableData.length}</span>
                    </div>
                    <div className="select-per-page">
                        <FormGroup >
                            {/*<Label for="exampleSelect">Select</Label>*/}
                            <Input type="select" name="select" id="per-page-select" bsSize="sm" defaultValue={this.state.paginatorPerPageValue} onChange={this.handleChangePaginatorPerPageValue}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="-1">All</option>
                            </Input>
                        </FormGroup>
                    </div>

                </div>

            </div>


        );
    }
}
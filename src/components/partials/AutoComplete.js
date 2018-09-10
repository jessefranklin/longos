import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { headers } from '../../const/global';
import { Creatable } from "react-select";

import axios from 'axios';

// POST: http://digitalpreorder-staging.azurewebsites.net/api/assignee?storeId=store1&counter=Kitchen&name=Alex Drenea
const employees = [
    { value: 'unassigned', label: 'Unassigned', disabled: true  },
    { value: 'Sandy Longo', label: 'Sandy Longo' },
    { value: 'Alex Longo', label: 'Alex Longo' }
]

export class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            assignee: this.props.assignee,
            value: ''
        }
    }
    componentDidMount() {

    };
    render() {
        const {assignees} = this.props;
        
        return (
            <div>
                <Creatable
                    name="assigned"
                    value={this.state.assignee}
                    onChange={this.props.onAssignedChange}
                    options={assignees.assignees} 
                    isSearchable={true}
                    clearable={true} 
                />
            
            </div>
        );
    }
};


const mapDispatch = dispatch => ({
    update: event => dispatch({ type: "UPDATE", value: event })
  });
  


export default connect(undefined,mapDispatch)(AutoComplete);
  


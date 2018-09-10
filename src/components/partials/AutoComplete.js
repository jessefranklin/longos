import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { headers } from '../../const/global';
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
            assignee: this.props.assignee
        }
    }
    componentDidMount() {

    };
    render() {
        const {assignees} = this.props;
        
        return (
            <div>
                <Select
                name="assigned"
                value={this.state.assignee}
                onChange={(e)=>this.props.onAssignedChange(e.value, 'assigned')}
                options={assignees.assignees} 
                isSearchable={true}
                clearable={false} 
                />
            
            </div>
        );
    }
};



export default connect()(AutoComplete);
  


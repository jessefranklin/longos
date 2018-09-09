import React, { Component } from 'react';
import Select from 'react-select';

const employees = [
    { value: 'unassigned', label: 'Unassigned', disabled: true  },
    { value: 'Sandy Longo', label: 'Sandy Longo' },
    { value: 'Alex Longo', label: 'Alex Longo' }
]

export const AutoComplete = ({assignee,reassignState,reassign,onAssignedChange}) => {
    return (
      <div>
        {assignee && !reassignState ? (
            <div>
            <OrderAssignee assignee={assignee} reassign={reassign} />
            </div>
        ):(
            <Select
            name="assigned"
            value={assignee}
            onChange={(e)=>onAssignedChange(e.value, 'assigned')}
            options={employees}
            isSearchable={true}
            clearable={false} 
            />)
        }
      </div>
    );
  };


  export const OrderAssignee = ({assignee,reassign}) => {
    return (
      <div>
        {assignee}
        <button className="order-detail--action" onClick={reassign}>Re-assign</button>
      </div>
    );
  };
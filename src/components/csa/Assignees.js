import React, { Component } from 'react';
import { AutoComplete } from '../partials/AutoComplete';

export const Assignees = ({assignee,reassignState,reassign,onAssignedChange,assignees}) => {
    return (
      <div>
        {assignee && !reassignState ? (
            <div>
                <OrderAssignee assignee={assignee} reassign={reassign} />
            </div>
        ):(
           <AutoComplete assignee={assignee} onAssignedChange={onAssignedChange} assignees={assignees} />
            )
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
import React from 'react';
import { Link } from 'react-router-dom';
import { sortByCounter } from '../../selectors/sortByCounter';


const OrderListCounterItem = ({item}) => {

    const statusClass = (status) => {
        switch (status){
            case 0:
                return 'unassigned';
            case 1: 
                return 'assigned';
            case 2:
                return 'completed';
            default:
                return 'unassigned';
        }
    }

    return(
        <div>
            {item.itemsCount}  
            {statusClass(item.status)}
        </div>
    )
};

  
export default OrderListCounterItem;
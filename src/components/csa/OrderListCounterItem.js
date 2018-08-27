import React from 'react';
import { Link } from 'react-router-dom';
import { sortByCounter } from '../../selectors/sortByCounter';


const OrderListCounterItem = ({item}) => {

    const statusClass = (status) => {
        switch (status){
            case 0:
                return (<h4 className="red">?</h4>);
            case 1: 
                return <i className="fa fa-user" aria-hidden="true"></i>;
            case 2:
                return <i className="fa fa-user green" aria-hidden="true"></i>;
            case 3:
                return <i className="fa fa-check green" aria-hidden="true"></i>;
            default:
                return (<h4 className="red">?</h4>);
        }
    }

    return(
        <div>
            <h4>{item.itemsCount}</h4>  
            {statusClass(item.status)}
        </div>
    )
};

  
export default OrderListCounterItem;
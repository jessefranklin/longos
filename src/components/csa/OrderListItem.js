import React from 'react';
import { Link } from 'react-router-dom';
import { sortByCounter } from '../../selectors/sortByCounter';
import { orderDate } from '../../selectors/orderDate';
import OrderListCounterItem  from './OrderListCounterItem';


const OrderListItem = ({item, pastOrders}) => {

    const counters = sortByCounter(item.counters);
    const dateNotification = orderDate(item.pickupDate);
    return(
        <div className='orders--item divTableRow'>
            <div className="cell-id">
                {dateNotification && !pastOrders ? <Indicator notification={dateNotification} />: ''}
                {item.id}<br />
                {item.pickupDate}<br />
                {item.pickupTime}
            </div>

            <div className="cell-status">
                {counters.bakery ? <OrderListCounterItem item={counters.bakery[0]} /> : '-'}
            </div>

            <div className="cell-status">
                {counters.deli ? <OrderListCounterItem item={counters.deli[0]} /> : '-'}
        
            </div>

            <div className="cell-status">
                {counters.kitchen ? <OrderListCounterItem item={counters.kitchen[0]} /> : '-'}
        
            </div>

            <div className="cell-status">
                {counters.saladbar ? <OrderListCounterItem item={counters.saladbar[0]} /> : '-'}
        
            </div>

            <div className="cell-status">
                {counters.sushi ? <OrderListCounterItem item={counters.sushi[0]} /> : '-'}
        
            </div>

            <div className="cell-status">
                {counters.cake ? <OrderListCounterItem item={counters.cake[0]} /> : '-'}
            </div>

            <div>
                <Link to={`/orderDetail/${item.id}`}>></Link>
            </div>
        </div>

    )
};
  
export default OrderListItem;


const Indicator = ({notification}) => {
    return (
        <div className={ notification.class + ' order--indicator' }>
            { notification.title }
        </div>  
    );
};
  
import React from 'react';
import { Link } from 'react-router-dom';
import { sortByCounter } from '../../selectors/sortByCounter';
import { orderDate } from '../../selectors/orderDate';
import OrderListCounterItem  from './OrderListCounterItem';


const OrderListItem = ({item}) => {

    const counters = sortByCounter(item.counters);
    const dateNotification = orderDate(item.pickupDate);
    return(
        <div className='orders--item divTableRow'>
            <div className="cell-id">
                {dateNotification.class ? <Indicator notification={dateNotification} />: ''}
                {item.id}
            </div>

            <div className="cell-date">
                {item.pickupDate}
            </div>

            <div>
                {counters.bakery ? <OrderListCounterItem item={counters.bakery[0]} /> : '-'}
            </div>

            <div>
                {counters.deli ? <OrderListCounterItem item={counters.deli[0]} /> : '-'}
        
            </div>

            <div>
                {counters.kitchen ? <OrderListCounterItem item={counters.kitchen[0]} /> : '-'}
        
            </div>

            <div>
                {counters.saladbar ? <OrderListCounterItem item={counters.saladbar[0]} /> : '-'}
        
            </div>

            <div>
                {counters.sushi ? <OrderListCounterItem item={counters.sushi[0]} /> : '-'}
        
            </div>

            <div>
                {counters.cake ? <OrderListCounterItem item={counters.cake[0]} /> : '-'}
        
            </div>

            <div>
                <Link to={`/orderDetail/${item.id}`}>View></Link>
            </div>
        </div>

    )
};
  
export default OrderListItem;


const Indicator = ({notification}) => {
    return (
        <div className={ notification.class }>
            { notification.title }
        </div>  
    );
};
  
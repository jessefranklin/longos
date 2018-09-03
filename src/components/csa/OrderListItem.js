import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { sortByCounter } from '../../selectors/sortByCounter';
import { orderDate } from '../../selectors/orderDate';
import OrderListCounterItem  from './OrderListCounterItem';


const OrderListItem = ({item, pastOrders, status, isPickedUp}) => {

    const counters = sortByCounter(item.counters);
    const dateNotification = orderDate(item.pickupDate);
    return(
        <div className='orders--item divTableRow'>
            <div className="cell-id">
                {dateNotification && !pastOrders ? <Indicator notification={dateNotification} />: ''}
                <strong>{item.id}</strong><br />
                {moment(item.pickupDate).format('MMMM Do, YYYY')}<br />
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
                {status === 1 ? (
                    <PickedupButton oId={item.id} isPickedUp={isPickedUp} checked={false} isPaid={item.isPaid}/>
                ):''}

                <Link to={`orderDashboard/orderDetail/${item.id}`}></Link>

            </div>
        </div>

    )
};
  
export default OrderListItem;


const PickedupButton = ({oId,isPickedUp,checked,isPaid}) => {
    return (
      <div className="btn--container">
            {checked?(
                
                <button className="checkbox-red checked"></button>
            ):(
                <button className="checkbox-red" onClick={() => isPickedUp(oId)} disabled={isPaid?'':'disabled'}></button>
            )}
      </div>
    );
  };
  
  


const Indicator = ({notification}) => {
    return (
        <div className={ notification.class + ' order--indicator' }>
            { notification.title }
        </div>  
    );
};
  
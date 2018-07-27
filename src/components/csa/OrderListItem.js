import React from 'react';
import { Link } from 'react-router-dom';

const OrderListItem = ({item}) => (
      <div className='orders--item'>
        <h4>{item.id}</h4>
        <p>{item.pickupDate}</p>
        <Link to={`/orderDetail/${item.id}`}>View></Link>
    </div>
);
  
export default OrderListItem;
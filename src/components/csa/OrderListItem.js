import React from 'react';
import { Link } from 'react-router-dom';
import { sortByCounter } from '../../selectors/sortByCounter';


const OrderListItem = ({item}) => {

    const counters = sortByCounter(item.counters);

    console.log(counters);
    return(
        <div className='orders--item'>
            <h4>{item.id}</h4>
            <p>{item.pickupDate}</p>

            <div className="">
                <div className="">
                    {counters.bakery && counters.bakery[0].itemsCount}
                
                </div>
                <div className="">
                    {counters.deli && counters.deli[0].itemsCount}
            
                </div>
                <div className="">
                    {counters.kitchen && counters.kitchen[0].itemsCount}
            
                </div>
                <div className="">
                    {counters.saladbar && counters.saladbar[0].itemsCount}
            
                </div>
                <div className="">
                    {counters.sushi && counters.sushi[0].itemsCount}
            
                </div>
                <div className="">
                    {counters.cake && counters.cake[0].itemsCount}
            
                </div>
                <div className="">
                    <Link to={`/orderDetail/${item.id}`}>View></Link>
            
                </div>
            </div>

        </div>
    )
};
  
export default OrderListItem;
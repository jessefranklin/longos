import React from 'react';
import { Link } from 'react-router-dom';



const CartProgress = ({ progress }) => (
    <div>
      <Link to="/order" className={progress==="1"?'active':''} >Pickup Details</Link>
      <Link to="/orderreview" className={progress==="2"?'active':''}>Review &amp; Submit Order</Link>
      <div className={progress==="3"?'active':''}>Order Confirmation</div>
    </div>
)
  
export default CartProgress;
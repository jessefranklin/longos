import React from 'react';
import { Link } from 'react-router-dom';

const CartProgress = ({ progress }) => (
    <div className="subheader--checkout">
      <div><Link to={progress==="2"?'/order':'#'} className={progress==="1"?'active':''}>Pickup Details</Link></div>
      <div><Link to={progress==="2"?'/orderreview':'#'} className={progress==="2"?'active':''}>Review &amp; Submit Order</Link></div>
      <div className={progress==="3"?'active':''}>Order Confirmation</div>
    </div>
)
  
export default CartProgress;
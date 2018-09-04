import React from 'react';
import { Link } from 'react-router-dom';

const CartProgress = ({ progress }) => (
    <div className="subheader--checkout">
      {progress==="2"?(
        <div>
          <Link to='/products/order' >Pickup Details</Link>
        </div>
      ):(
        <div className={progress==="1"?'active':''}>
          Pickup Details
        </div>
      )}
      

      <div className={progress==="2"?'active':''}>
        Review &amp; Submit Order
      </div>

      <div className={progress==="3"?'active':''}>Order Confirmation</div>
    </div>
)
  
export default CartProgress;
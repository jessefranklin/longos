import React from 'react';
import {Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 1, label: 'Ready For Pickup' },
  { value: 2, label: 'Order Has been picked up' }
]


export const StatusState = ({status,onSelectChange,isPaid}) => {
  return (
    <div>
        {status === 0 && <div className="state--not-ready">Not Ready</div> }
        {status === 1 && !isPaid && <div className="state--not-ready">Ready for pickup</div> }
        {status === 1 && isPaid && <Select
          name="status"
          value={status}
          onChange={(e)=>onSelectChange(e.value)}
          options={options}
          disabled={status === 0 ? true:false}
          clearable={false}
        /> }
        {status === 2 && <div className="state--completed">Completed</div> }
    </div>
  );
};

export const CancelModal = ({show,handleClose,cancel}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <div className="modal--cancel">
          <h3>Cancel Modal</h3>
          <h4>Are you sure you want to cancel this order?</h4>
          <div className="modal--buttons">
            <Button onClick={cancel}>Yes, Cancel</Button>
            <Button onClick={handleClose} className="btn-cancel">No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const PaidButton = ({isPaid,orderPaid,showPaidModal,handleShow,handleClose}) => {
  return (
    <div className="btn--container">
      {isPaid ? (
        <div>
          <button className="checkbox-red checked" onClick={() => orderPaid(false)}>Order is Paid </button>
        </div>
      ):(
        <button className="checkbox-red"  onClick={() => handleShow()}>Order is not paid</button>
      )}

      <Modal show={showPaidModal} onHide={handleClose}>
        <div className="modal--cancel">
          <h3>Order Paid</h3>
          <h4>Please enter your receipt ID below.</h4>
          <div className="modal--buttons">
            <Button onClick={() => orderPaid(true)}>Yes, Cancel</Button>
            <Button onClick={handleClose} className="btn-cancel">No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
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
            <Button onClick={cancel} className="btn-primary btn-left btn-green">Yes, Cancel</Button>
            <Button onClick={handleClose} className="btn-primary btn-right">No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const PaidButton = ({isPaid,orderPaid,showPaidModal,handleShow,handleClose,receiptChange}) => {
  return (
    <div className="btn--container">
      {isPaid ? (
        <div>
          <div className="checkbox-red checked">Order is Paid </div>
        </div>
      ):(
        <button className="checkbox-red"  onClick={() => handleShow()}>Order is not paid</button>
      )}

      <Modal show={showPaidModal} onHide={handleClose}>
        <div className="modal--cancel">
          <h3>Order Paid</h3>
          <h4>Please enter your receipt ID below.</h4>
          <Modal.Body>
          <textarea
            placeholder="Receipt #"
            onChange={(recNo) => receiptChange(recNo)}
            rows="1"
          >
          </textarea>
          </Modal.Body>
          <div className="modal--buttons">
            <Button onClick={() => orderPaid(true)} className="btn-primary btn-left btn-green">Confirm</Button>
            <Button onClick={handleClose} className="btn-primary btn-right">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
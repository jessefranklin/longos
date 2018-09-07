import React from 'react';
import MediaQuery from 'react-responsive';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import TimePicker from 'react-bootstrap-time-picker';

class EditDateTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarFocused: false,
      pickupDate: this.props.csaOrder.pickupDate,
      pickupTime: moment(this.props.csaOrder.pickupTime, 'h:mm a').diff(moment().startOf('day'), 'seconds')
    };
  }

  updatePickupTime = (val) => {
    this.setState(() => ({ 'pickupTime': val }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  };
  updateClient = () => {
    
    const payload = {
      id: this.props.csaOrder.id,
      storeId: this.props.csaOrder.store.id,
      client: {
        ...this.props.csaOrder.client
      },
      pickUpDate: this.state.pickupDate,
      pickUpTime: moment().startOf('day').seconds(this.state.pickupTime).format('HH:mm:ss')
    }
    this.props.updateClientPickup('editPickup',payload);
  }
  render() {
    const { profile } = this.props;
    let date = moment(this.state.pickupDate).format("MM/DD/YYYY");
    return (
      <div>
        <div className="date-picker">
          <i className="fa fa-calendar" aria-hidden="true"></i>
            <input
              type="date"
              name="pickupDate"
              placeholder="Select Date"
              value={this.state.pickupDate}
              onChange={this.handleChange.bind(this)}
            />
         
        </div>
        <div className="time-picker">
          <i className="fa fa-clock" aria-hidden="true"></i>
          <TimePicker onChange={this.updatePickupTime} start="8:00" end="22:00" value={this.state.pickupTime} />
        </div>

        <div className="form--action-row">

        <button className="order-detail--action" onClick={() => this.props.handleClose('editPickup')}>Cancel</button>
        <button className="order-detail--action btn-red" onClick={() => this.updateClient()}>Save</button>
        </div>

      </div>
    )
  }
}
  

export default EditDateTime;
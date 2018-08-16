import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { setProfile } from '../../actions/profile';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { ListGroup, ListGroupItem, Form, FormControl, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import { setOrder } from '../../actions/order';
import CartProgress from './CartProgress';
import TimePicker from 'react-bootstrap-time-picker';

class CartOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.profile ? props.profile.username : '',
      email: props.profile ? props.profile.email : '',
      phone: props.profile ? props.profile.phone : '',
      rewards: props.profile.rewards ? props.profile.rewards : '',
      calendarFocused: false,
      pickUpDate: props.order.pickUpDate?moment(props.order.pickUpDate):moment(),
      time: props.order.time?props.order.time:32400,
      status: 'pending',
      createdAt: moment(),
      error: ''
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);

  }
  onDateChange = (pickUpDate) => {
    if (pickUpDate) {
      this.setState(() => ({ pickUpDate }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  };
  handleTimeChange(time) {
    console.log(time);
    this.setState({ time });
  }
  onSubmit = (e) => {
    this.props.setProfile({
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      rewards: this.state.rewards
    });
    this.props.setOrder({
      pickUpDate: this.state.pickUpDate,
      time: this.state.time,
      status: this.state.status,
      createdAt: this.state.createdAt
    });
  };
  render() {
    const { profile } = this.props;
    return (
      <div>
      
        <CartProgress progress="1" />

        <div className="form-group">
          <SingleDatePicker
            date={this.state.pickUpDate} 
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />

          <TimePicker onChange={this.handleTimeChange} start="8:00" end="22:00" value={this.state.time} />

          <input
            type="text"
            name="username" 
            className='form-control'
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="email"
            name="email"
            className='form-control' 
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="phone"
            name="phone" 
            className='form-control'
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="number" 
            name="rewards" 
            className='form-control'
            value={this.state.rewards}
            placeholder="rewards number"
            onChange={this.handleChange.bind(this)}
          />

          <div>
            Allow for 24 hour notice or call in store for other accommodations."
          </div>

          <Link className="btn" to="/orderreview" onClick={this.onSubmit}>Next step</Link>
          
          <Link to="/products" className="btn btn-secondary">Cancel</Link>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
    profile: state.profile,
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile)),
  setOrder: (order) => dispatch(setOrder(order))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
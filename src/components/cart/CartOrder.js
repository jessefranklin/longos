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
import MediaQuery from 'react-responsive';
import FormValidator from '../shared/FormValidator';
import { totalCount } from '../../selectors/cartTotal';

class CartOrder extends React.Component {
  constructor(props) {
    super(props);

    const Validation = new FormValidator([
      { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
      },
      {
        field: 'phone', 
        method: 'matches',
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], 
        validWhen: true, 
        message: 'That is not a valid phone number.'
      },
      {
        field: 'rewards', 
        method: 'matches',
        args: [/^[0-9]{8}$/], 
        validWhen: true, 
        message: 'That is not a valid rewards number.'
      }
    ]);

    this.validator = Validation;

    this.state = {
      username: props.profile ? props.profile.username : '',
      email: props.profile ? props.profile.email : '',
      phone: props.profile ? props.profile.phone : '',
      rewards: props.profile.rewards ? props.profile.rewards : '',
      calendarFocused: false,
      pickUpDate: props.order.pickUpDate?moment(props.order.pickUpDate):moment(new Date()).add(1,'days'),
      time: props.order.time?props.order.time:32400,
      status: 'pending',
      createdAt: moment(),
      validation: this.validator.valid(),
      error: ''
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.submitted = false;
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
    this.setState({ time });
  }
  dateWithin = () => {
    return true;
  }
  onSubmit = (e) => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    this.submitted = true;
    if (validation.isValid) {
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
      this.props.history.push("/products/orderReview");
    }
  };
  render() {
    let validation = this.submitted ?                        
                    this.validator.validate(this.state) :   
                    this.state.validation  
    const { profile } = this.props;
    const { cart, cartTotal, total, cartTax } = this.props;
    const itemWord = total === 1 ? 'item' : 'items' ;
    let dateWithin = this.dateWithin();

    return (
      <div>

        <div className="cart--header">
          <h2>Place Order <span className="title-light">({total} {itemWord})</span></h2>
          <Link to="/products" className="link--continue-shopping">Continue Shopping</Link>
        </div>

        <CartProgress progress="1" />

        <div className="form-group">
          <div className="form-inputs">
            <div className="time-inputs">
              <div className="date-picker">
                <i className="far fa-calendar-alt" aria-hidden="true"></i>
                <MediaQuery query="(min-device-width: 769px)">
                  <SingleDatePicker
                    date={this.state.pickUpDate}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                  />
                </MediaQuery>
                <MediaQuery query="(max-device-width: 768px)">
                  <input
                    type="date"
                    name="pickUpDate"
                    placeholder="Select Date"
                    value={this.state.pickUpDate}
                    onChange={this.handleChange.bind(this)}
                  />
                </MediaQuery>
              </div>

              <div className="time-picker">
                <i className="far fa-clock" aria-hidden="true"></i>
                <TimePicker onChange={this.handleTimeChange} start="8:00" end="22:00" value={this.state.time} />
              </div>
            </div>

            <div className='f-con'> 
              <label htmlFor="username">Username</label>   
              <input
                type="text"
                name="username"
                className='form-control' 
                autoComplete="off" 
                placeholder="First and Last Name"
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className={validation.email.isInvalid ? 'f-con has-error' : 'f-con'}>    
              <label htmlFor="email">Email</label>   
              <input
                type="email"
                name="email"
                className='form-control' 
                autoComplete="off" 
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
              <span className="help-block">{validation.email.message}</span>
            </div>

            <div className={validation.phone.isInvalid ? 'f-con has-error' : 'f-con'}>
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                name="phone"
                className='form-control' 
                autoComplete="off" 
                placeholder="phone"
                value={this.state.phone}
                onChange={this.handleChange.bind(this)}
              />
              <span className="help-block">{validation.phone.message}</span>
            </div>

            <div className={validation.rewards.isInvalid ? 'f-con has-error' : 'f-con'}>
              <label htmlFor="rewards">Rewards</label>
              <input
                type="number"
                name="rewards"
                className='form-control' 
                autoComplete="off" 
                value={this.state.rewards}
                placeholder="rewards number"
                onChange={this.handleChange.bind(this)}
              />
              <span className="help-block">{validation.rewards.message}</span>
            </div>

            <div className='checkout--disclaimer'>
              {dateWithin ? (
                <div>
                  Allow for 24 hour notice or call in store for other accommodations.
                </div>
              ): null }
               

            </div>
          </div>

          <button className="btn" onClick={this.onSubmit}>Next step</button>

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

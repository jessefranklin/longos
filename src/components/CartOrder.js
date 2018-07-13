import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { setProfile } from '../actions/profile';
import ProductsHeader from '../components/ProductsHeader';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { ListGroup, ListGroupItem, Form, FormControl, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';

import CartProgress from './CartProgress';

class CartOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.profile ? props.profile.username : '',
      email: props.profile ? props.profile.email : '',
      phone: props.profile ? props.profile.phone : '',
      rewards: props.profile.rewards ? props.profile.rewards : '',
      calendarFocused: false,
      pickUpDate: moment(),
      time: '',
      order: {
        id: 0,
        status: 'pending',
        createdAt: moment()
      },
      error: ''
    };
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
  onSubmit = (e) => {
    this.props.setProfile(this.state);
  };
  render() {
    const { profile } = this.props;
    return (
      <div>
        <ProductsHeader />

        <div className="content--container">
        
          <CartProgress progress="yyy" />

          <div className="form-group">
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

            <SingleDatePicker
              date={this.state.pickUpDate} 
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />

            <Link className="btn" to="/orderreview" onClick={this.onSubmit}>Next step</Link>
            <Link to="/products" className="btn btn-secondary">Cancel</Link>
            <div>
              Allow for 24 hour notice or call in store for other accommodations."
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
    profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
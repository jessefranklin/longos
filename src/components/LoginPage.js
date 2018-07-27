import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { setProfile } from '../actions/profile';
import { Textbox } from 'react-inputs-validation';
import { StateLoader } from '../state.loader';
import { removeCart }  from '../actions/cart';
import { resetOrder }  from '../actions/order';
import { fetchConfigs } from '../actions/config';
import { fetchProducts } from '../actions/customer/products';

const headers = {
  mode: "no-cors",
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  }
}

class LoginPage extends React.Component {
  state = {
    
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      touched: {
        email: false,
        username: false
      }
    }

  
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.props.fetchConfigs();
    let stateLoader = new StateLoader();
    stateLoader.removeState();
    this.props.removeCart();
    this.props.resetOrder();
    this.props.fetchProducts();
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  canBeSubmitted() {
    const errors = this.validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  validate() {
    return {
      email: this.state.email.length === 0,
      username: this.state.username.length === 0
    };
  }

  validEmail(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.validEmail());
    if (!this.validEmail()) {
      e.preventDefault();
      return;
    }
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }
    this.props.setProfile(this.state);
    let val = e.target.getAttribute('data')
    history.push(val);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  render(){
    const errors = this.validate(this.state.email, this.state.username);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

    return(
      <div>
        <div className="box-layout">
          <h1>
            <span className="longos-logo"></span>
          </h1>
          <div className="box-layout__box">
          <input
            className={shouldMarkError('username') ? "error" : ""}
            type="text"
            name="username" 
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
            onBlur={this.handleBlur('username')}
          />
          <input
            className={shouldMarkError('email') ? "error" : ""}
            type="text"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleBlur('email')}
          />

            <input
              type="phone"
              name="phone" 
              placeholder="phone"
              onChange={this.handleChange}
            />
            <input
              type="number" 
              name="rewards" 
              placeholder="rewards number"
              onChange={this.handleChange}
            />
    
            <Link className="button" to="/products" data="/products" 
              onClick={this.onSubmit}
              disabled={isDisabled} 
            >Customer/Products</Link>
            <Link to="/orderDashboard">CSA Dashboard</Link><br /><br />
            <Link to="/settings">Settings</Link>
            </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile)),
  fetchProducts: () => dispatch(fetchProducts()),
  removeCart: () => dispatch(removeCart()),
  resetOrder: () => dispatch(resetOrder()),
  fetchConfigs: () => dispatch(fetchConfigs())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
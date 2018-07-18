import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { setProfile } from '../actions/profile';
import { Textbox } from 'react-inputs-validation';
import { StateLoader } from '../state.loader';
import { removeCart }  from '../actions/cart';
import { resetOrder }  from '../actions/order';
import { fetchConfigs } from "../actions/config";
import { fetchProducts } from "../actions/products";

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
  componentDidMount() {
    this.props.fetchConfigs();
    let stateLoader = new StateLoader();
    stateLoader.removeState();
    this.props.removeCart();
    this.props.resetOrder();
    this.props.fetchProducts();

    
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.setProfile(this.state);
    let val = e.target.getAttribute('data')
    history.push(val);
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }
  render(){
    return(
      <div>
        <div className="box-layout">
          <h1>
            <span className="longos-logo"></span>
          </h1>
          <div className="box-layout__box">
            <input
              type="text"
              placeholder="username"
              name="username" 
              onChange={this.handleChange}
            />
            <input
              type="email"
              name="email" 
              placeholder="email"
              onChange={this.handleChange}
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
    
            <Link className="button" to="/products" data="/products" onClick={this.onSubmit}>Customer/Products</Link>
            <Link to="/dashboard">CSA Dashboard</Link><br /><br />
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
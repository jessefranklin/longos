import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { setProfile } from '../actions/profile';
import { Textbox } from 'react-inputs-validation';
import { StateLoader } from "../state.loader"
import { removeCart }  from '../actions/cart';

class LoginPage extends React.Component {
  state = {
  };
  componentDidMount() {
    let stateLoader = new StateLoader();
    stateLoader.removeState();
  }
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
            <Link to="/dashboard">CSA Dashboard</Link>
            
            </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
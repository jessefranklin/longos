import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { setProfile } from '../actions/profile';
import { Textbox } from 'react-inputs-validation';
import { StateLoader } from '../state.loader';
import { removeCart }  from '../actions/cart';
import { resetOrder }  from '../actions/order';
import { resetProfile }  from '../actions/profile';
import { fetchConfigs } from '../actions/config';
import { fetchProducts } from '../actions/customer/products';
import { setTextFilter, setOrderFilter } from '../actions/filter';

const headers = {
  mode: "no-cors",
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'guest',
      email: '',
      phone: '',
      username: '',
      rewards: '',
      touched: {
        email: false,
        phone: false,
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
    this.props.resetProfile();
    this.props.fetchProducts();
    this.props.setTextFilter('');
    this.props.setOrderFilter('');
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  canBeSubmitted() {
      const errors = this.validate(this.state.name, this.state.phone, this.state.email);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
    return isDisabled;
  }

  validate() {
    return {
      name: this.state.username.length != 0,
      phone: this.validPhone(),
      email: this.validEmail()
    };
  }

  validEmail(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  validPhone(){
    var phoneno = /^\d{10}$/;
    return phoneno.test(this.state.phone);
  }

  onSubmit = (e) => {
    console.log(this.state);  
    e.preventDefault();
    
    if (!this.canBeSubmitted() && !this.state.rewards) {
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

  swapLogin(val) {
    this.setState({ active: val});
  }

  render(){
    const errors = this.validate(this.state.name, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

    return(
      <div className="login-scene">
        <a href="/" className="brand--container">
          <span className="longos-logo"></span>
        </a>
        <h1>Welcome to the<br /> in-store pre-order experience</h1>
        <h3>Please sign in</h3>
        <div className="box-layout__box">
          
          <ul className="tab-nav">
            <li><button className={this.state.active ==='guest'?'active':''} onClick={() => this.swapLogin('guest')}>Sign In as Guest</button></li>
            <li><button className={this.state.active ==='card'?'active':''} onClick={() => this.swapLogin('card')}>Sign In with Rewards Card</button></li>
          </ul>
          
          {this.state.active ==='guest' && <Guest state={this.state} handleChange={this.handleChange} handleBlur={this.handleBlur} shouldMarkError={shouldMarkError} onSubmit={this.onSubmit} errors={errors} />}

          {this.state.active ==='card' && <Card state={this.state} handleChange={this.handleChange} onSubmit={this.onSubmit}  />}
  
          

          <div className="csa-container">
            <Link to="/orderDashboard">CSA Dashboard</Link><br /><br />
          </div>

        </div>
      </div>
    )
  }
}


const Guest = ({state, handleChange, handleBlur, shouldMarkError, onSubmit, errors}) => (
  <div className="guest-container form-group">
    <input
      className={errors.name ? "form-control" : "error form-control"}
      type="text"
      name="username" 
      placeholder="First and Last Name"
      value={state.username}
      onChange={handleChange}
      onBlur={handleChange}
    />
    
    <input
      className={errors.email ? "form-control" : "error form-control"}
      type="text"
      name="email"
      placeholder="Email Address"
      value={state.email}
      onChange={handleChange}
      onBlur={handleChange}
    />

    <input
      className={errors.phone ? "form-control" : "error form-control"}
      type="phone"
      name="phone" 
      placeholder="Phone Number"
      onChange={handleChange}
    />

    <Link className="button" to="/products" data="/products" 
            onClick={onSubmit}
          >Sign-In</Link>
  </div>
)

const Card = ({state, handleChange, onSubmit}) => (
  <div className="rewards-container form-group">
    <input
      className="form-control"
      type="number" 
      name="rewards" 
      value={state.rewards}
      placeholder="Rewards Number"
      onChange={handleChange}
    />

    <Link className="button" to="/products" data="/products" 
            onClick={onSubmit}
            // disabled={isDisabled} 
          >Sign-In</Link>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile)),
  fetchProducts: () => dispatch(fetchProducts()),
  removeCart: () => dispatch(removeCart()),
  resetOrder: () => dispatch(resetOrder()),
  resetProfile: () => dispatch(resetProfile()),
  fetchConfigs: () => dispatch(fetchConfigs()),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setOrderFilter: (text) => dispatch(setOrderFilter(text))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
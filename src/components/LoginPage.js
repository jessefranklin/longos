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
import FormValidator from './shared/FormValidator';

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

    
    const cartValidation = new FormValidator([
      { 
        field: 'rewards', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave provide a number.'
      }
    ])

    const guestValidation = new FormValidator([
      { 
        field: 'username', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Name is required.' 
      },{ 
        field: 'email', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Email is required.' 
      },
      { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
      },
      { 
        field: 'phone', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave provide a phone number.'
      },
      {
        field: 'phone', 
        method: 'matches',
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], 
        validWhen: true, 
        message: 'That is not a valid phone number.'
      }
    ]);

    this.validator = guestValidation;

    this.state = {
      active: 'guest',
      email: '',
      phone: '',
      username: '',
      rewards: '',
      validation: this.validator.valid(),
    }

    this.submitted = false;
  }

  handleInputChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }
    
  handleFormSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
      this.props.setProfile(this.state);
      history.push('/products');  
    }
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

  swapLogin(val) {
    this.setState({ active: val});
    
  }

  render(){
    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation    

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
          
          {this.state.active ==='guest' && <Guest state={this.state} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}  validation={this.state.validation}  />}

          {this.state.active ==='card' && <Card state={this.state} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}  validation={this.state.validation}  />}
          

          <div className="csa-container">
            <Link to="/orderDashboard">CSA Dashboard</Link><br /><br />
          </div>

        </div>
      </div>
    )
  }
}


const Guest = ({state, handleInputChange, handleFormSubmit, validation}) => (
  <div className="guest-container form-group">
    <div className={validation.username.isInvalid ? 'f-con has-error' : 'f-con'}> 
      <label htmlFor="username">Username</label>   
      <input
        className="form-control"
        type="text"
        name="username" 
        autoComplete="off" 
        placeholder="First and Last Name"
        value={state.username}
        onChange={handleInputChange}
      />
      <span className="help-block">{validation.username.message}</span>
    </div>

    <div className={validation.email.isInvalid ? 'f-con has-error' : 'f-con'}>    
      <label htmlFor="email">Email</label>   
      <input
        className="form-control"
        type="text"
        name="email"
        autoComplete="off" 
        placeholder="Email Address"
        value={state.email}
        onChange={handleInputChange}
      />
      <span className="help-block">{validation.email.message}</span>
    </div>

    <div className={validation.phone.isInvalid ? 'f-con has-error' : 'f-con'}>
      <label htmlFor="phone">Phone</label>
        <input
        className="form-control"
        type="phone"
        autoComplete="off" 
        name="phone" 
        placeholder="Phone Number"
        onChange={handleInputChange}
      />
      <span className="help-block">{validation.phone.message}</span>
    </div>

    <button className="button"
      onClick={handleFormSubmit}
          >Sign-In</button>
  </div>
)

const Card = ({state, handleInputChange, handleFormSubmit, validation}) => (
  <div className="rewards-container form-group">
  <div className='f-con'>
    <label htmlFor="rewards">Phone</label>
      <input
        className="form-control"
        type="number" 
        name="rewards" 
        autoComplete="off" 
        value={state.rewards}
        placeholder="Rewards Number"
        onChange={handleInputChange}
      />
    </div>

    <button className="button"
      onClick={handleFormSubmit}
        >Sign-In</button>
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
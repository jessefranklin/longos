import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/csa/auth';
import CSAFeedback from './CSAFeedback';


class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }
  toggleModal = () =>{
    this.setState({ showModal: true})
  }
  handleClose = () => {
    this.setState({ showModal : false });
  }
  render(){
    const {startLogout} = this.props;
    return(
      <footer className="footer">
        <Link to="/orderDashboard">Order Dashboard</Link>
        <Link to="/orderDashboard/settings">Settings</Link>
        <button className="btn clear-button-styling" onClick={this.toggleModal}>Feedback</button>
        <button className="btn btn-qu" onClick={startLogout}>Logout</button>
        <Link to="/" className="customer-login">Go to Customer Login</Link>

        <CSAFeedback showModal={this.state.showModal} handleClose={this.handleClose} /> 
      </footer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapDispatchToProps)(Footer);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/csa/auth';
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
    const {logout} = this.props;
    return(
      <footer className="footer">
        <Link to="/orderDashboard">Order Dashboard</Link>
        <Link to="/orderDashboard/settings">Settings</Link>
        <Link to="/orderDashboard/CancelledOrders">Cancelled orders</Link>
        <button className="btn clear-button-styling" onClick={this.toggleModal}>Report Issue</button> <span className="pipe-white">|</span>
        <button className="btn btn-qu" onClick={logout}>Logout</button>

        <CSAFeedback showModal={this.state.showModal} handleClose={this.handleClose} />
      </footer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});


export default connect(undefined,mapDispatchToProps)(Footer);

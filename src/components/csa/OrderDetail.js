import React, {Component} from 'react';
import { connect } from 'react-redux';
let axios = require('axios');

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

const orderAPI = 'http://digitalpreorder.azurewebsites.net/api/order';

class OrderDetail extends Component {
  constructor(props, context) {
    super(props, context);

  }
  componentDidMount() {
    const orderID = `?orderId=${this.props.match.params.id}`;
    
    let url = orderAPI + orderID;
    
    axios.get(url, headers).then(
        (response) => {
            console.log(response.data);
            this.setState(response.data);
        },
        (err) => {
            console.log(err);
        }
    )
  };
  render() {
    return (
      <div >
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (order) => dispatch(updateOrder(order))
});

export default connect(undefined, mapDispatchToProps)(OrderDetail);
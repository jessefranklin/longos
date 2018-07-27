import React, {Component} from 'react';
import { connect } from 'react-redux';
let axios = require('axios');

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}


class OrderDetail extends Component {
  constructor(props, context) {
    super(props, context);

  }
  componentDidMount() {
    const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order`;
    const orderID = `?orderId=O8184008`;
    
    console.log(this.props.match.params.id);
    // const orderIDs = `?storeid=${config[0].store_id}`;
    // let url = orderAPI + orderID;
    
    // axios.get(url, headers).then(
    //     (response) => {
    //         console.log(response.data);
    //         dispatch(fetchCSAOrdersSuccess(response.data));
    //     },
    //     (err) => {
    //         console.log(err);
    //     }
    // )
  };
  render() {
    
    return (
      <div >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order
});


export default OrderDetail;

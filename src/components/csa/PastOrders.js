import React from 'react';
import { connect } from "react-redux";
import { fetchCSAPastOrders }  from '../../actions/csa/pastOrders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter, filterByStatus } from '../../selectors/orders';
import config from '../../server/config.json';

let axios = require('axios');

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        perpage: 50,
        page: 2,
        counter: '',
        dateRangeStart: '',
        dateRangeEnd:'',
        query:'',
        pastOrders: []
    }
  }
  componentDidMount() {
    const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order/pickedup`;
    const orderIDs = `?storeid=${config[0].store_id}`;
    let url = orderAPI + orderIDs;
    
    axios.get(url, headers).then(
        (response) => {
            this.setState({'pastOrders': response.data});
        },
        (err) => {
            console.log(err);
        }
    )
  };
  render(){

    return(
      <div>
        <CSAHeader />
        <div className="content--container">
          <OrdersFilters />
            
          <div className="divTable">
            <div className="divTableBody">

              <div className="divTableRow">

                <div className="cell-id">
                    Order #
                </div>

                <div className="cell-date">
                    Pickup Date
                </div>

                <div>
                    Bakery
                </div>

                <div>
                    Deli
                </div>
                
                <div>
                    Kitchen
                </div>

                <div>
                    Salad Bar
                </div>

                <div>
                    Sushi
                </div>

                <div>
                    Cake
                </div>

                <div>

                </div>
            
              </div>

              {this.state.pastOrders.map(order => {
                return <OrderListItem key={order.id} item={order} pastOrders={true} />;
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default DashboardPage;


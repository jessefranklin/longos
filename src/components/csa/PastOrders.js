import React from 'react';
import { connect } from "react-redux";
import { fetchCSAPastOrders }  from '../../actions/csa/pastOrders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import OrdersFilters from './OrdersFilters';
import config from '../../server/config.json';
import { Pagination } from '../partials/Pagination';

let axios = require('axios');

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

// api/order/pickedup?storeId=store1&[perpage=20]‌&[page=0]‌&[counter=[counter]]


class PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        perpage: 10,
        page: 0,
        counter: this.props.filters.counter,
        dateRangeStart: '',
        dateRangeEnd:'',
        query:''
    }
  }
  componentDidMount() {
    let url = this.returnUrlwithParam();
    this.props.fetchCSAPastOrders(url);
  };
  componentDidUpdate(){
      console.log('hey');
  }
  returnUrlwithParam(){
    const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order/pickedup`;
    const orderIDs = `?storeid=${config[0].store_id}`;
    const counter = this.state.counter !== '' ? `&counter=${this.state.counter}` : '';
    const params = `&perpage=${this.state.perpage}&page=${this.state.page}${counter}`
    return orderAPI + orderIDs + params;
  }
  onPaginationChange(){
      
  }
  render(){
    const {pastorders} = this.props;

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

              {pastorders.orders.map(order => {
                return <OrderListItem key={order.id} item={order} pastOrders={true} />;
              })}

            </div>
          </div>

          <Pagination onPaginationChange={this.onPaginationChange}/>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
    filters: state.filters,
    pastorders: state.pastorders
});

const mapDispatchToProps = (dispatch) => ({
    fetchCSAPastOrders:(params) => dispatch(fetchCSAPastOrders(params))
});
  

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
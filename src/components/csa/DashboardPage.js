import React from 'react';
import { connect } from "react-redux";
import { fetchCSAOrders }  from '../../actions/csa/orders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import OrdersFilters from './OrdersFilters';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCSAOrders();
  };
  render(){

    return(
      <div>
        <CSAHeader />
        <div className="content--container">
          <OrdersFilters />
          {this.props.orders.items.map(order => {
            return <OrderListItem key={order.id} item={order} />;
          })}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrders: () => dispatch(fetchCSAOrders())
});

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);


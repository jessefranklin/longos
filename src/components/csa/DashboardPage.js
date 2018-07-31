import React from 'react';
import { connect } from "react-redux";
import { fetchCSAOrders }  from '../../actions/csa/orders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter } from '../../selectors/orders';

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
          {this.props.orders.map(order => {
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
  orders: filterByCounter(selectOrders(state.orders.items,state.filters),state.filters)
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);


import React from 'react';
import { connect } from "react-redux";
import { fetchCSAOrders }  from '../../actions/csa/orders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import CSAFooter from './CSAFooter';
import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter, filterByStatus } from '../../selectors/orders';

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
            


              {this.props.orders.map(order => {
                return <OrderListItem key={order.id} item={order} />;
              })}

            </div>
          </div>
        </div>
        <CSAFooter />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCSAOrders: () => dispatch(fetchCSAOrders())
});

const mapStateToProps = state => ({
  orders: filterByStatus(filterByCounter(selectOrders(state.orders.items,state.filters),state.filters),state.filters)
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);


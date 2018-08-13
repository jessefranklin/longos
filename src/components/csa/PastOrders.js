import React from 'react';
import { connect } from "react-redux";
import { fetchCSAPastOrders }  from '../../actions/csa/pastOrders';
import OrderListItem from './OrderListItem';
import CSAHeader from './CSAHeader';
import OrdersFilters from './OrdersFilters';
import { selectOrders, filterByCounter, filterByStatus } from '../../selectors/orders';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        perpage: 50,
        page: 2,
        counter: '',
        dateRangeStart: '',
        dateRangeEnd:'',
        query:''
    }
  }
  componentDidMount() {
    this.props.fetchCSAPastOrders();
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
            

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCSAPastOrders: () => dispatch(fetchCSAPastOrders())
});

const mapStateToProps = state => ({
  orders: state.pastorders
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);


import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { filterByStatus } from '../../actions/filter';

export class OrderStatusFilters extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
      
    constructor(props, context) {
        super(props, context);
        this.handleStatus = this.handleStatus.bind(this);
    }
    handleStatus(value){
        this.props.filterByStatus(value);
        if(value < 2) this.context.router.history.push("/orderDashboard");
    };
    render() {
      return (
        <div>
            <ul className="statusFilter">
                <li><button onClick={() => this.handleStatus(0)}>Pending</button></li>
                <li><button onClick={() => this.handleStatus(1)}>Ready for pickup</button></li>
                <li><Link to="/pastOrders" className={this.props.pastOrders ? 'active' : ''}>Picked Up</Link></li>
            </ul>
        </div>
    );
    }
};

const mapDispatchToProps = (dispatch) => ({
    filterByStatus: (text) => dispatch(filterByStatus(text))
});


export default connect(undefined, mapDispatchToProps)(OrderStatusFilters);
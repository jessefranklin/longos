import React from 'react';
import { connect } from 'react-redux';
import { filterByStatus } from '../../actions/filter';

export class OrderStatusFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleStatus = this.handleStatus.bind(this);
    }
    handleStatus(value){
        this.props.filterByStatus(value);
    };
    render() {
      return (
        <div>
            <ul>
                <li><button onClick={() => this.handleStatus(0)}>Pending</button></li>
                <li><button onClick={() => this.handleStatus(1)}>Ready for pickup</button></li>
                <li><button onClick={() => this.handleStatus(2)}>Picked Up</button></li>
            </ul>
        </div>
    );
}
};

const mapDispatchToProps = (dispatch) => ({
    filterByStatus: (text) => dispatch(filterByStatus(text))
});
  
export default connect(undefined, mapDispatchToProps)(OrderStatusFilters);
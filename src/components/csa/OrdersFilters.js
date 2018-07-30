import React from 'react';
import { connect } from 'react-redux';
import { setOrderFilter } from '../../actions/filter';

export class OrdersFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleCounter = this.handleCounter.bind(this);
    }
    onTextChange = (e) => {
      this.props.setOrderFilter(e.target.value);
    };
    onClearField = (e) => {
      this.props.setOrderFilter('');
    };
    handleCounter (value){
        console.log(value);
    }
    render() {
      return (
        <div>
            <input
                type="text"
                value={this.props.filters.order}
                onChange={this.onTextChange}
            />
            <button className="close" onClick={this.onClearField}>x</button>

            <ul>
                <li><button onClick={() => this.handleCounter('all')}>All Dept.</button></li>
                <li><button onClick={() => this.handleCounter('deli')}>Deli</button></li>
                <li><button onClick={() => this.handleCounter('kitchen')}>Kitchen</button></li>
                <li><button onClick={() => this.handleCounter('salad')}>Salad bar</button></li>
                <li><button onClick={() => this.handleCounter('sushi')}>Sushi</button></li>
                <li><button onClick={() => this.handleCounter('cakes')}>Cakes</button></li>
            </ul>
        </div>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setOrderFilter: (text) => dispatch(setOrderFilter(text)),

  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersFilters);
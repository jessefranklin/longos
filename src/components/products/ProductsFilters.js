import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../../actions/filter';

export class ProductListFilters extends React.Component {
    state = {};
    onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
    };
    onClearField = (e) => {
      this.props.setTextFilter('');
    };
    render() {
      return (
        <div>
         
          <div className="searchContainer">
            <input
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              className="search"
            />
            <button className="close" onClick={this.onClearField}>x</button>
          </div>
        </div>
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductListFilters);
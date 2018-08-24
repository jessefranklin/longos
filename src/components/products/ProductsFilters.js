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
         
          <div className={this.props.filters.text.length >= 1 ? 'searchContainer active' :'searchContainer'}>
            <input
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              className="search"
            />
            <i className="fas fa-search"></i>
            {this.props.filters.text.length >= 1 ? (
              <button className="closer icon--close" onClick={this.onClearField}></button>
            ) : ''}
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
import React from 'react';
import { connect } from 'react-redux';

export class OrderCounterFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instance: this.props.activeHandler,
            counter: this.props.counterActive
        }
    }
    activeHandlers (value) {
        if(this.state.instance){
            return this.props.filters.counter === value ? 'active' : '';
        } else {
            return this.props.counterActive === value ? 'active' : '';
        }
    }
    isDisabled (value) {
        if(!this.state.instance){
            
        }
        return false;
    }
    render() {
      return (
        <div>
            <ul>
                <li><button className={this.activeHandlers('')} onClick={() => this.props.handleCounter('')} disabled={this.isDisabled()}>All Dept.</button></li>
                <li><button className={this.activeHandlers('deli')} onClick={() => this.props.handleCounter('deli')} disabled={this.isDisabled('deli')}>Deli</button></li>
                <li><button className={this.activeHandlers('kitchen')} onClick={() => this.props.handleCounter('kitchen')} disabled={this.isDisabled('kitchen')}>Kitchen</button></li>
                <li><button className={this.activeHandlers('salad')} onClick={() => this.props.handleCounter('salad')} disabled={this.isDisabled('salad')}>Salad bar</button></li>
                <li><button className={this.activeHandlers('sushi')} onClick={() => this.props.handleCounter('sushi')} disabled={this.isDisabled('sushi')}>Sushi</button></li>
                <li><button className={this.activeHandlers('cake')} onClick={() => this.props.handleCounter('cakes')} disabled={this.isDisabled('cakes')}>Cakes</button></li>
            </ul>
        </div>
        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(OrderCounterFilters);
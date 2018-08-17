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
        <div className="counterFilter">
            <ul>
                <li><button className={this.activeHandlers('')} onClick={() => this.props.handleCounter('')} disabled={this.isDisabled()}>All Dept.</button></li>
                <li><button className={this.activeHandlers('Bakery')} onClick={() => this.props.handleCounter('Bakery')} disabled={this.isDisabled('Bakery')}>Bakery</button></li>
                <li><button className={this.activeHandlers('Deli')} onClick={() => this.props.handleCounter('Deli')} disabled={this.isDisabled('Deli')}>Deli</button></li>
                <li><button className={this.activeHandlers('Kitchen')} onClick={() => this.props.handleCounter('Kitchen')} disabled={this.isDisabled('Kitchen')}>Kitchen</button></li>
                <li><button className={this.activeHandlers('Salad Bar')} onClick={() => this.props.handleCounter('Salad Bar')} disabled={this.isDisabled('Salad Bar')}>Salad bar</button></li>
                <li><button className={this.activeHandlers('Sushi')} onClick={() => this.props.handleCounter('Sushi')} disabled={this.isDisabled('Sushi')}>Sushi</button></li>
                <li><button className={this.activeHandlers('Cake')} onClick={() => this.props.handleCounter('Cake')} disabled={this.isDisabled('Cake')}>Cakes</button></li>
            </ul>
        </div>
        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(OrderCounterFilters);
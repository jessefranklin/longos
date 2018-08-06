import React from 'react';

export class OrderCounterFilters extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
      return (
        <div>
            <ul>
                <li><button onClick={() => this.props.handleCounter('')}>All Dept.</button></li>
                <li><button onClick={() => this.props.handleCounter('deli')}>Deli</button></li>
                <li><button onClick={() => this.props.handleCounter('kitchen')}>Kitchen</button></li>
                <li><button onClick={() => this.props.handleCounter('salad')}>Salad bar</button></li>
                <li><button onClick={() => this.props.handleCounter('sushi')}>Sushi</button></li>
                <li><button onClick={() => this.props.handleCounter('cakes')}>Cakes</button></li>
            </ul>
        </div>
    );
}
};

export default OrderCounterFilters;
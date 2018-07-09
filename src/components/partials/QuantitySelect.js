import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

let q = [];
const quantityList = _.range(1, 11).map((value, index) => {
    q.push({label: index+1, value: index+1})
})

export const QuantitySelect = (props) => {
    return (
        <div>
            <Select
                name="quantity"
                value={props.quantity}
                onChange={props.onQuantityChange}
                options={q} 
                searchable={false}
                clearable={false} 
            />
        </div>
    )
}

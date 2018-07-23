import React from 'react';
import Select from 'react-select';
import _ from 'lodash';


export const OptionsSelect = ({options,value,onChange}) => {

    let optionsArray = [];
    {options.options.map(option => {
        optionsArray.push({ value: option.value, label: option.label });
    })}
    

    return (
        <div>
            <Select
                name={options.name}
                value={value}
                placeholder={options.name}
                onChange={(e) => onChange(e.value, options.name)}
                options={optionsArray} 
                className={options.type==='hidden'?'hidden':''}
                searchable={false}
                clearable={false} 
            />
        </div>
    )
}


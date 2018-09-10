import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

export const OptionsSelect = ({options,value,onChange,disabled}) => {

    let optionsArray = [];
    {options.options.map(option => {
        optionsArray.push({ value: option.value, label: option.label });
    })}
    
    const AsyncComponent = value === 'other'
			? Select.AsyncCreatable
			: Select.Async;
    

    return (
        <div>
            <Select
                name={options.name}
                value={value}
                placeholder={options.name}
                onChange={(e) => onChange(e.value, options.name)}
                options={optionsArray} 
                disabled={disabled}
                className={options.type==='hidden'?'hidden':''}
                searchable={false}
                clearable={true} 
            />
        </div>
    )
}


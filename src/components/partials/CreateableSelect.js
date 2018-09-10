import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';


export const CreateableSelect = ({options,value,onChange,disabled}) => {

    let optionsArray = [];
    {options.options.map(option => {
        optionsArray.push({ value: option.value, label: option.label });
    })}

    return (
        <div>
            <CreatableSelect
                isClearable
                name={options.name}
                value={value}
                placeholder={options.name}
                onChange={(e) => onChange(e.value, options.name)}
                options={optionsArray} 
                clearable={true}
            />
        </div>
    )
}


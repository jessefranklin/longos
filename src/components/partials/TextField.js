import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

export const TextField = ({properties,value,onChange}) => {
    if(properties.type === "text") {
        return (
            <div>
                <input type="text" name={properties.name} placeholder={properties.placeholder} onChange={(e) => onChange(e.target.value, properties.name)} />
            </div>
        );
    } else {
        return (
            <div>
                <textarea
                    placeholder={properties.placeholder}
                    onChange={(e) => onChange(e.target.value, properties.name)}
                    >
                </textarea>
            </div>
        );
    }
}

import _ from 'lodash';

export const sortByCounter = (items) => {
    let groupByCounter = {};   
    const groupBy = _.groupBy(items, item => item.counterName);
    _(groupBy).keys().sort().each(function (key) {
        groupByCounter[key.toLowerCase().replace(' ','')] = groupBy[key];
    });


    return groupByCounter;
};


export const listCounter = (items) => {
    let groupByCounter = {};   
    const groupBy = _.groupBy(items, item => item.counterName);
    _(groupBy).keys().sort().each(function (key) {
        groupByCounter[key] = groupBy[key];
    });


    return groupByCounter;
};


import _ from 'lodash';

export default (products) => {
    let groupByCounter = {};   
    const groupBy = _.groupBy(products, product => product.counter);
    _(groupBy).keys().sort().each(function (key) {
        groupByCounter[key] = groupBy[key];
    });

    return groupByCounter;
};



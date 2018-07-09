import _ from 'lodash';

export default (products) => {
    
    let groupByAlpha = {};   
    const groupBy = _.groupBy(products, product => product.category);
    _(groupBy).keys().sort().each(function (key) {
        groupByAlpha[key] = groupBy[key];
    });

    return groupByAlpha;
};

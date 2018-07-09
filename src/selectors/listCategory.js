import _ from 'lodash';

export default (products) => {
    let listCategoryAlpha = {};   
    const listCategory = _.groupBy(products, product => product.category);
    _(listCategory).keys().sort().each(function (key) {
        listCategoryAlpha[key] = listCategory[key];
    });
    return listCategoryAlpha;
};

import _ from 'lodash';

export const listCategory = (products) => {
    let listCategoryAlpha = {};   

    let productsAll = _.filter(products, product => {
        return product.counter !== 'Cake';
    });

    
    const listCategory = _.groupBy(productsAll, product => {
        return product.category
    });


    _(listCategory).keys().sort().each(function (key) {
        listCategoryAlpha[key] = listCategory[key];
    });

    return listCategoryAlpha;
};


export const listCakeCategories = (products) => {
    let listCategoryCake = {};   

    let cakes = _.filter(products, product => {
        return product.counter === 'Cake';
    });;
    
    const listCakes = _.groupBy(cakes, product => {
        return product.category
    });


    _(listCakes).keys().sort().each(function (key) {
        listCategoryCake[key] = listCakes[key];
    });

    return listCategoryCake;
};

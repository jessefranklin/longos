// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});


// SET_TEXT_FILTER
export const setOrderFilter = (text = '') => ({
    type: 'SET_ORDER_FILTER',
    text
});

export const filterByCounter = (text = '') => ({
    type: 'FILTER_BY_COUNTER',
    text
});

export const filterByStatus = (text = '') => ({
    type: 'FILTER_BY_STATUS',
    text
});

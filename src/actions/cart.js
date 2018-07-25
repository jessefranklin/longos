import uuid from 'uuid/v1';

// startAddToCart
export const startAddToCart = (productData = {}) => {
  return (dispatch, getState) => {
    const {
      id = 0,
      type= '',
      productId = '',
      productName = '',
      optionId = '',
      optionName = '',
      options = {},
      priceId = '',
      price = '',
      tax = 0,
      quantity = 0,
      comment = ''
    } = productData;
    
    const product = {id,type,productId,productName,optionId,optionName,options,priceId,price,tax,quantity,comment}

    dispatch(addToCart({
      id: uuid(),
      ...product
    })) 
  }
};

// ADD_TO_CART
export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  product
});


// Start Remove Item;
export const startRemoveItem = ({ id } = {}) => {
  return (dispatch, getState) => {
    dispatch(removeItem({ id }));
  }
};

// ADD_TO_CART
export const removeItem = ({ id }) => ({
  type: 'REMOVE_ITEM',
  id
});

// Start Edit Item
export const startEditItem = (id,update) => {
  return (dispatch, getState) => {
    dispatch(editItem(id, update));
  }
};

// EDIT_EXPENSE
export const editItem = (id, updates) => ({
  type: 'EDIT_ITEM',
  id,
  updates
});


// EMPTY CART
export const removeCart = () => ({
  type: 'EMPTY_CART'
});

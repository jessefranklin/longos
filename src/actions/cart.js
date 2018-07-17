import uuid from 'uuid/v1';

// startAddToCart
export const startAddToCart = (productData = {}) => {
  return (dispatch, getState) => {
    const {
      productNumber = 0,
      name = 'default',
      description = 'description',
      option = {},
      quantity = 0,
      note = ''
    } = productData;
    
    const product = {productNumber,name,description,option,quantity,note}

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
export const startEditItem = (id,item) => {
  return (dispatch, getState) => {
    dispatch(editItem(id, item));
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

export const totalCount = (products, {text}) => {
  return products.filter((product) => {
    const textMatch = product.description.toLowerCase().includes(text.toLowerCase()) || product.name.toLowerCase().includes(text.toLowerCase()) || product.category.toLowerCase().includes(text.toLowerCase());
    
    return textMatch;
  });
};

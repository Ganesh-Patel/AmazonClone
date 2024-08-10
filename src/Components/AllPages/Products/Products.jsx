import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../../../Redux/Slices/productSlice'; // Ensure this path is correct
import ProductCard from './ProductCard/ProductCard';
import { SearchContext } from '../../myContexts/SearchContext';

const ProductsPage = () => {
  const { products, filteredProducts, status, error } = useSelector((state) => state.product || { products: [], filteredProducts: [], status: 'idle', error: null });
  const dispatch = useDispatch();
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    dispatch(searchProducts(searchTerm));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {content}
    </div>
  );
};

export default ProductsPage;

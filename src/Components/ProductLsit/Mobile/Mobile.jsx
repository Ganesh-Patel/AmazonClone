import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMobileData } from './../../../Redux/Slices/mobileDataslice';

const Mobile = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.mobileData);

  useEffect(() => {
    dispatch(fetchMobileData({ query : 'Phone', page :'1', country : 'US', sort_by : 'RELEVANCE', product_condition : 'ALL' }));
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error || 'An unknown error occurred'}</p>;

  return (
    <div>
      {data && data.products && data.products.length > 0 ? (
        <div>
          {data.products.map((product, index) => (
            <div key={index}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Brand: {product.brand}</p>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Mobile;

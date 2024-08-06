import React, { useState } from 'react';
import data from './../../AllData/SearchData';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import Card from './../CreateCard/Card'; // Assuming this is the Card component you want to use
import FilterSidebar from './../../Filters/Sidebarfilter/FilterSidebar'; // Import the FilterSidebar component
import style from './Mobiles.module.css';
import { toast } from 'react-toastify';

function Mobiles() {
  const [filteredData, setFilteredData] = useState(data.data.products);
  const { setCartItems } = useGlobalState();

  const handleAddToCart = (item) => {
    const newItem = {
      id: item.asin,
      name: item.product_title,
      price: parseInt(item.product_price),
      quantity: 1,
      image: item.product_photo,
    };

    // Assuming setCartItems is available in context or props
     setCartItems((prevItems) => [...prevItems, newItem]);
    toast('Item added to cart!');
  };

  const handleFilterChange = (filters) => {
    let filtered = data.data.products;

    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.product_price);
        return price >= minPrice && (!maxPrice || price <= maxPrice);
      });
    }

    // Apply brand filter
    if (filters.brand.length > 0) {
      filtered = filtered.filter((item) => filters.brand.includes(item.product_brand));
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((item) => filters.category.includes(item.product_category));
    }

    setFilteredData(filtered);
  };

  return (
    <div className={style.container}>
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className={style.productList}>
        {filteredData.map((product) => (
          <Card
            key={product.asin}
            imageUrl={product.product_photo}
            title={product.product_title}
            price={product.product_price}
            currency='USD'
            originalPrice={product.product_original_price}
            savings={'500'}
            linkUrl={product.product_url}
            onActionClick={() => handleAddToCart(product)}
             actionLabel="Add to Cart"
            ratings={{ stars: product.product_star_rating, numRatings: product.product_num_ratings }}
            additionalInfo = {'null'}
          />
        ))}
      </div>
    </div>
  );
}

export default Mobiles;

import Card from './../CreateCard/Card';
import React, { useState, useEffect, useContext } from 'react';
import FilterSidebar from '../../Filters/Sidebarfilter/FilterSidebar';
import styles from './Mobiles.module.css';
import data from '../../AllData/SearchData';
import { toast } from 'react-toastify';
import { SearchContext } from '../../myContexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGlobalState } from '../../myContexts/GlobalStateContext';

const Mobiles = () => {
  const [filteredData, setFilteredData] = useState(data.data.products);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: '',
    brand: [],
    avgcustomerreview: '',
  });
  const { setCartItems } = useGlobalState();
  const { user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { searchTerm } = useContext(SearchContext);

  const handleAddToCart = (item) => {
    if (status === 'succeeded') {
      const priceInUSD = parseInt(item.product_price?.replace(/[^0-9.-]+/g, '') || '0');

      const price = priceInUSD * 82;
      console.log('price added to cart is', price);
      const newItem = {
        id: item.asin,
        name: item.product_title,
        price,
        quantity: 1,
        image: item.product_photo,
      };

      setCartItems((prevItems) => [...prevItems, newItem]);
      toast('Item added to cart!');
    } else {
      toast.error('Please login to add items to cart');
      navigate('/login');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    let filtered = data.data.products;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.product_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.price) {
      console.log('filters.price', filters.price);
      let minPrice = 0, maxPrice = Infinity;

      if (filters.price.includes('-')) {
        // Extract min and max prices from the range
        [minPrice, maxPrice] = filters.price.split('-').map(price => Number(price.replace(/[^0-9]/g, '')));
      } else if (filters.price.includes('Over')) {
        // Extract min price for "Over" range
        minPrice = Number(filters.price.replace(/[^0-9]/g, ''));
        maxPrice = Infinity; 
      } else if (filters.price.includes('Under')) {
        maxPrice = Number(filters.price.replace(/[^0-9]/g, ''));
      }
      const conversionRate = 82;
      filtered = filtered.filter((item) => {
        const priceInUSD = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, '') || '0');
        const priceInINR = priceInUSD * conversionRate;
        console.log('object', priceInINR, minPrice, maxPrice);
        return priceInINR >= minPrice && priceInINR <= maxPrice;
      });
    }

    if (filters.brand.length > 0) {
      filtered = filtered.filter((item) => filters.brand.includes(item.brand));
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter((item) => filters.category.includes(item.category));
    }
    //product_star_rating
    if (filters.avgcustomerreview) {
      console.log('filters.customerReview', filters.avgcustomerreview);
      const reviewThreshold = parseInt(filters.avgcustomerreview.split(' ')[0], 10);
      console.log('reviewThreshold', reviewThreshold);
    
      filtered = filtered.filter((item) => {
        const itemReview = parseFloat(item.product_star_rating) || 0;
        console.log('itemReview', itemReview, reviewThreshold);
        return itemReview >= reviewThreshold;
      });
    }

    setFilteredData(filtered);
  }, [filters, searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
      <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
   
      <div className={styles.productList}>
        {filteredData.map((product) => (
          <Card
            key={product.asin}
            imageUrl={product.product_photo}
            title={product.product_title}
            price={parseFloat(product.product_price?.replace(/[^0-9.-]+/g, '') || '0')}
            currency={product.currency}
            originalPrice={parseFloat(product.product_original_price?.replace(/[^0-9.-]+/g, '') || '0')}
            savings={{ amount: '500' }} 
            linkUrl={product.asin}
            onActionClick={() => handleAddToCart(product)}
            actionLabel="Add to Cart"
            ratings={{ stars: product.product_star_rating, numRatings: product.product_num_ratings }}
            additionalInfo={product.sales_volume}
          />
        ))}
      </div>
    </div>
  );
};

export default Mobiles;

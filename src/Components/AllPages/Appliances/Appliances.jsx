import React, { useState, useEffect, useContext } from 'react';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import deals from '../../AllData/deals';
import Card from '../../AllPages/CreateCard/Card';
import FilterSidebar from '../../Filters/Sidebarfilter/FilterSidebar';
import styles from './Appliances.module.css';
import { toast } from 'react-toastify';
import { SearchContext } from '../../myContexts/SearchContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Appliances() {
  const { setCartItems } = useGlobalState();
  const { searchTerm } = useContext(SearchContext);
  const [filteredData, setFilteredData] = useState(deals[0]?.data?.deals || []);
  const [allDeals, setAllDeals] = useState(deals[0]?.data?.deals || []);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: '',
    price: '',
    brand: [],
    avgcustomerreview: '',
    rating: '',
  });
  const { user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
   
    const { deal_id, deal_title, deal_price, deal_photo } = item;
    const priceInUSD = parseFloat(deal_price.amount?.replace(/[^0-9.-]+/g, '') || '0');
    const priceInINR = priceInUSD * 82;
    console.log('object', priceInINR);
    const newItem = {
      id: deal_id,
      name: deal_title,
      price: parseInt(priceInINR),
      quantity: 1,
      image: deal_photo,
    };
    if (status === 'succeeded') {
      setCartItems((prevItems) => [...prevItems, newItem]);
      toast('Item added to cart!');
    } else {
      toast.error('Please login to add items to cart!');
      navigate('/login');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    let filtered = allDeals;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.deal_title.toLowerCase().includes(searchTerm.toLowerCase())
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
        maxPrice = Infinity; // No upper limit
      } else if (filters.price.includes('Under')) {
        // Extract max price for "Under" range
        maxPrice = Number(filters.price.replace(/[^0-9]/g, ''));
      }
      const conversionRate = 82;
      filtered = filtered.filter((item) => {
        const priceInUSD = parseFloat(item.deal_price.amount?.replace(/[^0-9.-]+/g, '') || '0');
        const priceInINR = priceInUSD * conversionRate;
        console.log('object', priceInINR, minPrice, maxPrice);
        return priceInINR >= minPrice && priceInINR <= maxPrice;
      });
    }
    if (filters.brand.length > 0) {
      console.log('filters.brand', filters.brand);
      const userSelectedBrands = filters.brand.map(brand => brand.toLowerCase());
      filtered = filtered.filter((item) => 
        userSelectedBrands.includes(item.brand.toLowerCase())
      );
    }

    if (filters.category.length > 0) {
      console.log('filters.category', filters.category);
      filtered = filtered.filter((item) => filters.category.includes(item.category));
    }
    //review or rating filter 
    if (filters.avgcustomerreview) {
      console.log('filters.customerReview', filters.avgcustomerreview);
      const reviewThreshold = parseInt(filters.avgcustomerreview.split(' ')[0], 10);
      console.log('reviewThreshold', reviewThreshold);
    
      filtered = filtered.filter((item) => {
        const itemReview = parseFloat(item.rating) || 0;
        // console.log('itemReview', itemReview, reviewThreshold);
        return itemReview >= reviewThreshold;
      });
    }

    setFilteredData(filtered);
  }, [filters, searchTerm, allDeals]);

  useEffect(() => {
    setAllDeals(deals[0]?.data?.deals || []);
  }, [deals]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
      <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.content}>
        <div className={styles.dealList}>
          {filteredData.length > 0 ? (
            filteredData.map((deal, index) => (
              <Card
                key={`${deal.deal_id}-${index}`}
                imageUrl={deal.deal_photo}
                title={deal.deal_title}
                price={deal.deal_price.amount}
                originalPrice={deal.list_price.amount}
                savings={{ amount: deal.savings_amount.amount, percentage: deal.savings_percentage }}
                linkUrl={deal.deal_id}
                onActionClick={() => handleAddToCart(deal)}
                actionLabel="Add to Cart"
              />
            ))
          ) : (
            <p>No items found for the selected categories.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appliances;

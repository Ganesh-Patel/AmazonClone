import React, { useState, useEffect, useContext } from 'react';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import deals from '../../AllData/deals';
import Card from './../CreateCard/Card'; // Import the Card component
import FilterSidebar from './../../Filters/Sidebarfilter/FilterSidebar'; // Import the FilterSidebar component
import styles from './Appliances.module.css';
import { toast } from 'react-toastify';
import { SearchContext } from '../../myContexts/SearchContext'; // Import the SearchContext

function Appliances() {
  const { setCartItems } = useGlobalState();
  const { searchTerm } = useContext(SearchContext); // Use the SearchContext
  const [filteredData, setFilteredData] = useState(deals[0]?.data?.deals || []);
  const [allDeals, setAllDeals] = useState(deals[0]?.data?.deals || []); // Store all deals for resetting filters

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    const { deal_id, deal_title, deal_price, deal_photo } = item;
    const newItem = {
      id: deal_id,
      name: deal_title.split(' ')[0], // You can customize the name extraction as needed
      price: parseInt(deal_price.amount),
      quantity: 1,
      image: deal_photo,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
    toast('Item added to cart!');
  };

  // Apply filters to data
  const handleFilterChange = (filters) => {
    let filtered = [...allDeals]; // Start with all deals

    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((item) => {
        const price = parseInt(item.deal_price.amount);
        return price >= minPrice && (!maxPrice || price <= maxPrice);
      });
    }

    // Apply brand filter
    if (filters.brand.length > 0) {
      filtered = filtered.filter((item) => filters.brand.includes(item.brand));
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((item) => filters.category.includes(item.category));
    }

    // Apply customer review filter (if applicable)
    if (filters.customerReview) {
      filtered = filtered.filter((item) => item.customer_review === filters.customerReview);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    // Filter data based on search term
    const searchFilteredData = allDeals.filter(item =>
      item.deal_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(searchFilteredData);
  }, [searchTerm, allDeals]);

  useEffect(() => {
    // Reset filters when deals change
    setAllDeals(deals[0]?.data?.deals || []);
  }, [deals]);

  return (
    <div className={styles.container}>
      <FilterSidebar onFilterChange={handleFilterChange} />
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
                linkUrl={deal.deal_url}
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

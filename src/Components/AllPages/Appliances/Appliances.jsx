import React from 'react';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import deals from '../../AllData/deals';
import styles from './Appliances.module.css';

function Appliances() {
  const { setCartItems } = useGlobalState();

  const handleAddToCart = (item) => {
    // Extract only the necessary properties
    const { deal_id, deal_title, deal_price, deal_photo } = item;
    const newItem = {
      id: deal_id,
      name: deal_title.split(' ')[0], // You can customize the name extraction as needed
      price: parseInt(deal_price.amount),
      quantity: 1, // Default quantity is 1 when added to cart
      image: deal_photo,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const dealItems = deals[0]?.data?.deals || [];

  return (
    <div className={styles.container}>
      <h2>Appliance Deals</h2>
      <div className={styles.dealList}>
        {dealItems.map((deal, index) => (
          <div key={`${deal.deal_id}-${index}`} className={styles.dealCard}>
            <img src={deal.deal_photo} alt={deal.deal_title} className={styles.dealImage} />
            <div className={styles.dealInfo}>
              <h3 className={styles.dealTitle}>{deal.deal_title.split(' ')[0]}</h3>
              <p className={styles.dealPrice}>
                ${deal.deal_price.amount} <span className={styles.listPrice}>${deal.list_price.amount}</span>
              </p>
              <p className={styles.savings}>You Save: ${deal.savings_amount.amount} ({deal.savings_percentage}%)</p>
              <a href={deal.deal_url} target="_blank" rel="noopener noreferrer" className={styles.dealLink}>
                View Deal
              </a>
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(deal)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appliances;

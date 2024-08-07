import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import { truncateText } from '../../Utils/truncateText';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Function to convert currency to INR
const convertToINR = async (amount, currency) => {
  // Placeholder API endpoint; replace with actual endpoint
  const apiEndpoint = `https://api.exchangerate-api.com/v4/latest/${currency}`;
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const conversionRate = data.rates.INR;
    return amount * conversionRate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return amount; // Fallback to returning the original amount if an error occurs
  }
};

function Card({
  imageUrl,
  title,
  price,
  currency = 'USD', // Assuming default currency is USD
  originalPrice,
  savings,
  linkUrl,
  onActionClick,
  actionLabel = 'Action',
  ratings,
  additionalInfo = null,
}) {
  const [priceInINR, setPriceInINR] = useState(price);
  const [originalPriceInINR, setOriginalPriceInINR] = useState(originalPrice);
  const [savingsInINR, setSavingsInINR] = useState(savings?.amount);

  const navigate = useNavigate();

  function viewDetails(linkUrl) {
    console.log("View Details" + linkUrl);
    navigate(`/details/${linkUrl}`);
  }

  useEffect(() => {
    const fetchPricesInINR = async () => {
      if (currency !== 'INR') {
        const priceConverted = await convertToINR(price, currency);
        setPriceInINR(priceConverted.toFixed(2));

        if (originalPrice) {
          const originalPriceConverted = await convertToINR(originalPrice, currency);
          setOriginalPriceInINR(originalPriceConverted.toFixed(2));
        }

        if (savings?.amount) {
          const savingsConverted = await convertToINR(parseFloat(savings.amount), currency);
          setSavingsInINR(savingsConverted.toFixed(2));
        }
      } else {
        setPriceInINR(price);
        setOriginalPriceInINR(originalPrice);
        setSavingsInINR(savings?.amount);
      }
    };

    fetchPricesInINR();
  }, [price, originalPrice, savings?.amount, currency]);

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{truncateText(title, 6)}</h3>
        <p className={styles.price}>
          ₹{priceInINR} {originalPriceInINR && <span className={styles.originalPrice}>₹{originalPriceInINR}</span>}
        </p>
        {savingsInINR && (
          <p className={styles.savings}>You Save: ₹{savingsInINR} ({savings?.percentage}%)</p>
        )}
        {additionalInfo && <p className={styles.additionalInfo}>{additionalInfo}</p>}
        {linkUrl && (
          <button onClick={() => viewDetails(linkUrl)} className={styles.link}>
            View More
          </button>
        )}
        <button className={styles.actionButton} onClick={onActionClick}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,  // Updated to number
  currency: PropTypes.string, // Currency code like 'USD', 'EUR', etc.
  originalPrice: PropTypes.string,  // Updated to number
  savings: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Updated to accept string or number
    percentage: PropTypes.string,
  }),
  linkUrl: PropTypes.string,
  onActionClick: PropTypes.func.isRequired,
  actionLabel: PropTypes.string,
  additionalInfo: PropTypes.string,
};

export default Card;

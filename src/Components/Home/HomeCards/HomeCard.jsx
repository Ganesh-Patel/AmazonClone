import React from 'react';
import styles from './HomeCard.module.css';

function HomeCard({ title, items, category }) {
  return (
    <div className={styles.cardContainer}>
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.productGrid}>
        {items.map((item, index) => (
          <div key={index} className={styles.productItem}>
            <img src={item.img} alt={item.name} className={styles.productImage} />
            <div className={styles.productName}> {item.name} </div>
          </div>
        ))}
      </div>
      <div className={styles.exploreMore}>
        <a href={`/${category}`} className={styles.exploreMoreLink}>
          Explore More
        </a>
      </div>
    </div>
    </div>
  );
}

export default HomeCard;

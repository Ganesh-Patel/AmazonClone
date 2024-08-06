import React from 'react';
import Recom from '../Recommendations/Recommendations';
import Carousel2 from '../Carousels/Carousel2.jsx';
import { productData } from './Data.js';
import HomeCard from './HomeCards/HomeCard.jsx';
import styles from './Home.module.css';
import Mobile from '../ProductLsit/Mobile/Mobile.jsx';
import Cart from '../AllPages/Cart/Cart.jsx';

function Home() {
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/prime/Aug24/DEALS-REVEALED_hero_PC_pse_2_2x._CB568322891_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/23/Central/BAU/ledaup/AA/PC_Hero_3000x1200_2x._CB568322637_.jpg',
    'https://m.media-amazon.com/images/I/61qVFfNuZzL._SX3000_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/AugART24/leadup/desktop_unrec_rev_1x_C._CB568294195_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/WhatsApp_Image_2024-08-01_at_11.39.54_PM_1._CB568206422_.jpg',
  ];

  return (
    <div className={styles.home}>
      
      <div className={styles.carouselContainer}>
        <Carousel2 images={images} />
      </div>
      <div className={styles.cardsContainer}>
        {productData.map((category, index) => (
          <HomeCard key={index} title={category.title} items={category.items} />
        ))}
      </div>

      <div className={styles.mobileContainer}>
        <Mobile />
      </div>
      <div className={styles.recomContainer}>
        <Recom />
      </div>
    </div>
  );
}

export default Home;

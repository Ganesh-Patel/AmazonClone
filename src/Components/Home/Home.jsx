import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recom from '../Recommendations/Recommendations';
import Carousel2 from '../Carousels/Carousel2.jsx';
// import Carouseltiming from '../Carousels/Carouseltiming.jsx';
import { productData } from './Data.js';
import { productData2 } from './Data2.js';
import HomeCard from './HomeCards/HomeCard.jsx';
import styles from './Home.module.css';
import Mobile from '../ProductLsit/Mobile/Mobile.jsx';
import Products from '../../Components/AllPages/Products/Products.jsx';
// import ReactMultiCarausel from '../Carousels/Demo/ReactMultiCarausel.jsx';

function Home() {
  const navigate = useNavigate();

  // Sample images for the carousel
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/prime/Aug24/DEALS-REVEALED_hero_PC_pse_2_2x._CB568322891_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/23/Central/BAU/ledaup/AA/PC_Hero_3000x1200_2x._CB568322637_.jpg',
    'https://m.media-amazon.com/images/I/61qVFfNuZzL._SX3000_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/AugART24/leadup/desktop_unrec_rev_1x_C._CB568294195_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/WhatsApp_Image_2024-08-01_at_11.39.54_PM_1._CB568206422_.jpg',
  ];

  // Handle category click to navigate to the corresponding page
  const handleCategoryClick = (route) => {
    console.log(route)
    navigate(route);
  };

  return (
    <div className={styles.home}>
      <div className={styles.carouselContainer}>
        <Carousel2 images={images} />
      </div>

      <div className={styles.cardsContainer}>
        {productData.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.category.toLocaleLowerCase())}
            className={styles.card}
          >
            <HomeCard title={category.title} items={category.items} category={category.category.toLocaleLowerCase()} />
          </div>
        ))}
      </div>
      <div className={styles.flightadvertisement}>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/APAY/travel/Flights_Editorial_2300x646._CB566488062_.jpg" alt="Flight-Advertisement" />
      </div>
      <div className={styles.cardsContainer2}>
        {productData2.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.category.toLocaleLowerCase())}
            className={styles.card}
          >
            <HomeCard title={category.title} items={category.items} category={category.category.toLocaleLowerCase()} />
          </div>
        ))}
      </div>
      {/* <Carouseltiming /> */}

      <div className={styles.productContainer}>
        <Products />
      </div>

      <div className={styles.mobileContainer}>
        <Mobile />
      </div>
      {/* <ReactMultiCarausel /> */}
      <div className={styles.recomContainer}>
        <Recom />
      </div>
    </div>
  );
}

export default Home;

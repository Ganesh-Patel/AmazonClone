import React, { useContext, useState , useEffect} from 'react';
import data from './../../AllData/SearchData';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import Card from './../CreateCard/Card'; // Import the Card component
import FilterSidebar from './../../Filters/Sidebarfilter/FilterSidebar'; // Import the FilterSidebar component
import style from './Mobiles.module.css';
import { toast } from 'react-toastify';
import { SearchContext } from '../../myContexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Mobiles() {
  const [filteredData, setFilteredData] = useState(data.data.products);
  const { setCartItems } = useGlobalState();
  const { user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const convertToINR = (amountInUSD) => {
    const conversionRate = 82; 
    return amountInUSD * conversionRate;
  };
  
  const handleAddToCart = (item) => {
    if(status === 'succeeded'){
    const price = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, '') || '0');
    const originalPrice = parseFloat(item.product_original_price?.replace(/[^0-9.-]+/g, '') || '0');

    const priceInINR = convertToINR(price);
    const originalPriceInINR = convertToINR(originalPrice);

    const newItem = {
      id: item.asin,
      name: item.product_title,
      price: priceInINR,
      quantity: 1,
      image: item.product_photo,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
    toast('Item added to cart!');
}
    else{
        toast.error('Please login to add items to cart');
        navigate('/login');
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = data.data.products;

    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, '') || '0');
        const priceInINR = convertToINR(price);
        return priceInINR >= minPrice && (!maxPrice || priceInINR<= maxPrice);
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
  const { searchTerm } = useContext(SearchContext);
  useEffect(() => {
    let filtered = data.data.products;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.product_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchTerm]);


  return (
    <div className={style.container}>
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className={style.productList}>
        {filteredData.map((product) => (
          <Card
            key={product.asin}
            imageUrl={product.product_photo}
            title={product.product_title}
            price={parseFloat(product.product_price?.replace(/[^0-9.-]+/g, '') || '0')}
            currency={product.currency}
            originalPrice={parseFloat(product.product_original_price?.replace(/[^0-9.-]+/g, '') || '0')}
            savings={'500'}  
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
}

export default Mobiles;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Details.module.css';
import initialData from './../../AllData/SearchData';
import axios from 'axios';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import Loader from './Loaders/Loaders.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useSelector } from 'react-redux';

function Details() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setCartItems } = useGlobalState();
    const { user, status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            const options = {
                method: 'GET',
                url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
                params: { asin: id, country: 'US' },
                headers: {
                    'x-rapidapi-key': 'a5fd3e080emshd7a183ebbe31cccp13319djsn2c76851ffcde',
                    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching details:', error);
                toast('API limit reached');
                // Simulate waiting for the loading state before setting fallback data
                setTimeout(() => {
                    // Check if initialData is an array
                    if (Array.isArray(initialData.data.products)) {
                        const fallbackItem = initialData.data.products.find(item => item.asin === id);
                        if (fallbackItem) {
                            const mappedFallbackItem = {
                                asin: fallbackItem.asin,
                                product_title: fallbackItem.product_title,
                                product_price: fallbackItem.product_price,
                                product_original_price: fallbackItem.product_original_price,
                                product_star_rating: fallbackItem.product_star_rating,
                                product_description: 'No description available', // Default description
                                delivery: fallbackItem.delivery || 'No delivery info', // Default delivery info
                                product_url: fallbackItem.product_url,
                                product_photo: fallbackItem.product_photo,
                                is_amazon_choice: fallbackItem.is_amazon_choice,
                                is_best_seller: fallbackItem.is_best_seller,
                                is_prime: fallbackItem.is_prime,
                            };
                            setDetails(mappedFallbackItem);
                        } else {
                            setDetails(null);
                        }
                    } else {
                        console.error('Initial data format is incorrect.');
                        setDetails(null); // Initial data is not in expected format
                    }
                    setLoading(false);
                }, 5000); // Show loading for 5 seconds
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.details}>
                Loading...
                <Loader />
            </div>
        );
    }

    if (!details) {
        return <div className={styles.details}>No details available.</div>;
    }

    const convertToINR = (amountInUSD) => {
        const conversionRate = 82;
        return (amountInUSD * conversionRate).toFixed(2);
    };

    const handleAddToCart = (item) => {
        if (status === 'succeeded') {
            const price = parseFloat(item.product_price?.replace(/[^0-9.-]+/g, '') || '0');
            const originalPrice = parseFloat(item.product_original_price?.replace(/[^0-9.-]+/g, '') || '0');

            const priceInINR = convertToINR(price);
            const newItem = {
                id: item.asin,
                name: item.product_title,
                price: priceInINR,
                quantity: 1,
                image: item.product_photo,
            };

            setCartItems((prevItems) => [...prevItems, newItem]);
            toast.success('Item added to cart!');
        }
        else {
            toast.error('Please login to add items to cart');
            navigate('/login');
        }
    };

    const price = parseFloat(details.product_price?.replace(/[^0-9.-]+/g, '') || '0');
    const originalPrice = parseFloat(details.product_original_price?.replace(/[^0-9.-]+/g, '') || '0');
    const priceInINR = convertToINR(price);
    const originalPriceInINR = convertToINR(originalPrice);

    return (
        <div className={styles.details}>
            <div className={styles.imageContainer}>
                <img src={details.product_photo} alt={details.product_title} />
            </div>
            <div className={styles.infoContainer}>
                <h1>{details.product_title}</h1>
                <p>{details.product_availability || 'Availability info not available'}</p>
                <p className={styles.delivery}>{details.delivery.split('.')[0]}.</p>
                <p className={styles.originalPrice}>Original Price: ₹{originalPriceInINR}</p>
                <p className={styles.price}>Current Price: ₹{priceInINR}</p>
                <p className={styles.starRating}>Rating: {details.product_star_rating} stars</p>
                <p className={styles.description}>{details.product_description.split('.')[2] || 'No description available'}.</p>
                <p>
                    <a href={details.product_url} target="_blank" rel="noopener noreferrer">
                        View on Amazon
                    </a>
                </p>
                <p>{details.is_amazon_choice && "Amazon's Choice"}</p>
                <p>{details.is_best_seller && "Best Seller"}</p>
                <p>{details.is_prime && "Prime Eligible"}</p>
                <button onClick={() => handleAddToCart(details)} className={styles.addToCartButton}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Details;

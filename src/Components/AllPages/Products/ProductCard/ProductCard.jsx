// components/ProductCard/ProductCard.jsx
import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../../Utils/formatCurrency'; // Utility to format currency
import { truncateText } from '../../../Utils/truncateText';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../../myContexts/GlobalStateContext';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      const priceInINR = await formatCurrency(product.price);
      setFormattedPrice(priceInINR);
    };
    fetchPrice();
  }, [product.price]);

  const { user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { setCartItems } = useGlobalState();

  const handleAddToCart = (item) => {
    if (status === 'succeeded') {

      const newItem = {
        id: item.id,
        name: item.title,
        price: formattedPrice,
        quantity: 1,
        image: item.thumbnail,
      };
      console.log('object to be added to cart', newItem);

      setCartItems((prevItems) => [...prevItems, newItem]);
      toast('Item added to cart!');
    } else {
      toast.error('Please login to add items to cart');
      navigate('/login');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48  object-contain"
      />
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 text-sm mb-2">{truncateText(product.description, 10)}</p>
        <p className="text-lg font-bold text-gray-900 mb-2">
          ₹{formattedPrice}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Rating: {product.rating} ({product.reviews.length} reviews)
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Stock: {product.stock} | {product.availabilityStatus}
        </p>
        <div className="flex gap-2 mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleAddToCart(product)} >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

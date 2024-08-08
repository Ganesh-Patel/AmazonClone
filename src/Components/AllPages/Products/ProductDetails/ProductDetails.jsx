// src/components/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.images[0]} alt={product.title} className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold mb-4">₹{product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="font-bold">Category:</span> {product.category}
          </div>
          <div className="mb-4">
            <span className="font-bold">Brand:</span> {product.brand}
          </div>
          <div className="mb-4">
            <span className="font-bold">Stock:</span> {product.stock} items available
          </div>
          <div className="mb-4">
            <span className="font-bold">SKU:</span> {product.sku}
          </div>
          <div className="mb-4">
            <span className="font-bold">Warranty:</span> {product.warrantyInformation}
          </div>
          <div className="mb-4">
            <span className="font-bold">Shipping Information:</span> {product.shippingInformation}
          </div>
          <div className="mb-4">
            <span className="font-bold">Return Policy:</span> {product.returnPolicy}
          </div>
          <div className="mb-4">
            <span className="font-bold">Reviews:</span>
            {product.reviews.map((review, index) => (
              <div key={index} className="mb-2">
                <div className="font-semibold">{review.reviewerName}</div>
                <div className="text-sm text-gray-600">{review.date}</div>
                <div>{'⭐'.repeat(review.rating)}</div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toast('Item added to cart!')} >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import React from 'react';
import { useGlobalState } from '../../myContexts/GlobalStateContext'; // Adjust the import path
import style from './MyOrder.module.css';
import { useNavigate } from 'react-router-dom';

function MyOrder() {
  const { orders } = useGlobalState();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
    <div className={style.emptyCart}>
    <img
      src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
      alt="Empty cart"
      className={style.emptyCartImage}
    />
    <div className={style.emptyCartText}>
      <h1 className={style.emptyCartTitle}>No Order found </h1>
      <div className={style.shopDeals} onClick={() => navigate('/home')}>
        <p>Shop today's deals</p>
      </div>
      <div className={style.buttons}>
        <button
          className={style.signInButton}
          onClick={() => navigate('/login')}
        >
          Sign into your account
        </button>
        <button
          className={style.signUpButton}
          onClick={() => navigate('/signup')}
        >
          Sign Up Now
        </button>
      </div>
    </div>
  </div>
    )
  }

  return (
    <div className={style.orderContainer}>
      <h1>Order Summary</h1>
      {orders.map((order, index) => (
        <div key={index} className={style.orderDetails}>
          <h2>Delivery Details</h2>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
          <h2>Items Ordered</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className={style.orderItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.itemImage}
                />
                <div className={style.itemDetails}>
                  <h3 className={style.itemName}>{item.name}</h3>
                  <p className={style.itemPrice}>₹{item.price}</p>
                  <p className={style.itemQuantity}>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <h2 className={style.totalPrice}>Total Price: ₹{order.totalPrice.toFixed(2)}</h2>
        </div>
      ))}
    </div>
  );
}

export default MyOrder;

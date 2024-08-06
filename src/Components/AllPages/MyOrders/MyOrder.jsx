import React from 'react';
import { useGlobalState } from '../../myContexts/GlobalStateContext'; // Adjust the import path
import style from './MyOrder.module.css';

function MyOrder() {
  const { orders } = useGlobalState();

  if (orders.length === 0) {
    return <div className={style.noOrdersMessage}>No order details found.</div>;
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

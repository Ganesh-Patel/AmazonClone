import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Cart.module.css';
import Razorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../myContexts/GlobalStateContext'; 
function Cart({  onUpdateItemQuantity, onDeleteItem }) {
    const { cartItems, setCartItems, orders,setOrders } = useGlobalState();
  const navigate = useNavigate();
  const isEmpty = cartItems.length === 0;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    const options = {
        key: "rzp_test_FxRK4tM1aleKRe",
        key_secret: "pxZi3HhnspLHh5kMQbqxMamd",
        amount: parseInt(totalPrice) * 100,
      currency: 'INR',
      name: 'Amazon',
      description: 'Test Transaction',
      image: 'https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg',
      handler: function (response) {
       
        setOrders([
            ...orders,
            {
              items: cartItems,
              totalPrice: totalPrice,
              deliveryDate: '2024-08-15', // Example delivery date
              address: '123 Example Street, City, Country',
            },
          ]);
          setCartItems([]);
          navigate('/myorders');
          toast('Payment Successful!');
      },
      prefill: {
        name: 'your name',
        email: 'youremail@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Address'
      },
      theme: {
        color: '#F7CA01'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className={style.cartContainer}>
      {isEmpty ? (
        <div className={style.emptyCart}>
          <img
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
            alt="Empty cart"
            className={style.emptyCartImage}
          />
          <div className={style.emptyCartText}>
            <h1 className={style.emptyCartTitle}>Your cart is empty</h1>
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
      ) : (
        <div>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div className={style.cartItem} key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.itemImage}
                />
                <div className={style.itemDetails}>
                  <h3 className={style.itemName}>{item.name}</h3>
                  <p className={style.itemPrice}>₹{item.price}</p>
                  <div className={style.quantityControls}>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={style.itemQuantity}>{item.quantity}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => onUpdateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={style.deleteButton}
                    onClick={() => onDeleteItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={style.totalPriceContainer}>
            <h2 className={style.totalPrice}>Total Price: ₹{totalPrice.toFixed(2)}</h2>
            <button
              className={style.payNowButton}
              onClick={handlePayment}
              disabled={totalPrice === 0}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

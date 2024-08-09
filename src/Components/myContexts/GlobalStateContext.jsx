import React, { createContext, useState, useContext } from 'react';

// Create context
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 100, quantity: 1, image: 'https://m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg' },
    { id: 2, name: 'Item 2', price: 200, quantity: 1, image: 'https://nobero.com/cdn/shop/files/black_e4d19185-c19d-4e7c-a14a-8d2a29c7bad3.jpg?v=1711976456' },
  ]);

  const [orders, setOrders] = useState([]);

  return (
    <GlobalStateContext.Provider value={{ cartItems, setCartItems, orders, setOrders }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

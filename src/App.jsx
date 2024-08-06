import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation  } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import './App.css';
import {  useGlobalState } from './Components/myContexts/GlobalStateContext';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Cart from './Components/AllPages/Cart/Cart';
import MyOrder from './Components/AllPages/MyOrders/MyOrder';
import Appliances from './Components/AllPages/Appliances/Appliances';




function App() {
  const {  setCartItems } = useGlobalState();

  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login' && location.pathname !== '/signup';

const onUpdateItemQuantity = (itemId, newQuantity) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
  );
};

const onDeleteItem = (itemId) => {
  setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
};

  return (

    <div className="App">
      {showHeaderFooter && <Header />}
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/appliances" element={<Appliances />} />
        <Route
          path="/cart"
          element={<Cart
            onUpdateItemQuantity={onUpdateItemQuantity}
            onDeleteItem={onDeleteItem}
          />}
        />
        <Route path="/myorders" element={<MyOrder />} />

      </Routes>
      {showHeaderFooter && <Footer />}
    </div>

  );
}

export default App;

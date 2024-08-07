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
import Recom from './Components/Recommendations/Recommendations';
import Mobiles from './Components/AllPages/Mobiles/Mobiles';
import Details from './Components/AllPages/DetailsPage/Details';
import ProtectedRoute from './Routes/ProtectedRoute';




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

    <div className="App" style={{ overflowX: 'hidden'}}>
      {showHeaderFooter && <Header />}
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/home/appliances" element={<Appliances />} />
            <Route path="/home/electronics" element={<Appliances />} />
            <Route path="/electronics" element={<Appliances />} />
            <Route path="/home/automobiles" element={<Appliances />} />
            <Route path="/automobiles" element={<Appliances />} />
            <Route path="/home/homestyles" element={<Appliances />} />
            <Route path="/homestyles" element={<Appliances />} />
            <Route path='/cell-phones-&-accessories' element={<Mobiles />} />
            <Route path='/home/cell-phones-&-accessories' element={<Mobiles />} />
            <Route path="/details/:id" element={<Details />} />
            <Route
              path="/cart"
              element={<Cart
                onUpdateItemQuantity={onUpdateItemQuantity}
                onDeleteItem={onDeleteItem}
              />}
            />
            <Route path="/myorders" element={<MyOrder />} />
        </Route>
        <Route path="/recommendations" element={<Recom />} />

      </Routes>
      {showHeaderFooter && <Footer />}
    </div>

  );
}

export default App;

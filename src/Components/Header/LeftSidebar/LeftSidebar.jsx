import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { formatEmail } from '../../Utils/truncateText';
import { logout } from '../../../Redux/Slices/authSlice'; 
import { useNavigate } from 'react-router-dom';

const LeftSidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status } = useSelector((state) => state.auth);

    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
      navigate('/login'); // Redirect to the login page after logout
    };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
      style={{ width: '30vw' }}
    >
      <div className="hidden md:flex justify-between items-center p-4 bg-black">
        <h2 className="text-xl font-bold">
          Hello, {status === 'succeeded' && user ? user.displayName || formatEmail(user.email) : 'Sign In'}
        </h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">
        <h3 className="font-bold">Trending</h3>
        <ul className="space-y-2">
          <li>Best Sellers</li>
          <li>New Releases</li>
          <li>Movers and Shakers</li>
          <li>See less</li>
        </ul>
        <h3 className="font-bold mt-4">Programs & Features</h3>
        <ul className="space-y-2">
          <li>Amazon Pay</li>
          <li>Gift Cards & Mobile Recharges</li>
          <li>Amazon Launchpad</li>
          <li>Amazon Business</li>
          <li>See all</li>
        </ul>
        <h3 className="font-bold mt-4">Help & Settings</h3>
        <ul className="space-y-2">
          <li>Your Account</li>
          <li>Customer Service</li>
          <li>
            <button onClick={handleLogout} className="text-left w-full">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;

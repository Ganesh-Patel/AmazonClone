import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaMapMarkerAlt, FaBars, FaTimes, FaFlag } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import amazonLogo from '../../../assets/logo.png';
import indiaFlag from '../../../assets/indiaflag.png';
import saleindia from '../../../assets/saleind.png';

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const handleLanguageChange = (language) => {
    setTempLanguage(language);
  };

  const handleSave = () => {
    setSelectedLanguage(tempLanguage);
    setIsLanguageMenuOpen(false);
  };

  const handleCancel = () => {
    setTempLanguage(selectedLanguage);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="bg-gray-800 text-white p-1 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="group border border-transparent p-2 group-hover:border-white">
            <Link to="/" className="flex-shrink-0">
              <img src={amazonLogo} alt="Amazon Logo" className="w-32" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center ml-4 group">
            <div className="flex items-center border border-transparent p-2 group-hover:border-white">
              <FaMapMarkerAlt className="text-yellow-400" />
              <div className="ml-2">
                <div className="text-xs">Deliver to New Delhi 110019</div>
                <div className="text-sm font-bold">Update Location</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 mx-4 items-center bg-gray-700 rounded-md overflow-hidden lg:ml-6">
          <select className="p-2 flex-shrink-0 border-none bg-gray-700 text-white focus:outline-none h-full w-14">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="text"
            className="flex-grow p-2 border-none focus:outline-none h-full text-black"
            placeholder="Search Amazon.in"
          />
          <button className="bg-[#F1A746] p-2 flex-shrink-0 h-full">
            <FaSearch className="text-gray-800 h-5 w-5" />
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer group" onClick={toggleLanguageMenu}>
            <div className="flex gap-2 items-center border border-transparent p-2 group-hover:border-white">
              <img src={indiaFlag} alt="Indian Flag" className="w-5 h-5" />
              <span>{selectedLanguage}</span>
              <GoTriangleDown />
            </div>
          </div>
          <div className="flex flex-col items-start cursor-pointer group" onClick={toggleAccountMenu}>
            <div className="flex flex-col items-start border border-transparent p-2 group-hover:border-white">
              <span className="text-xs">Hello, Sign in</span>
              <span className="flex items-center space-x-1">
                <span className="font-bold">Account & Lists</span>
                <GoTriangleDown />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start cursor-pointer group">
            <div className="flex flex-col items-start border border-transparent p-2 group-hover:border-white">
              <span className="text-xs">Returns</span>
              <span className="font-bold">& Orders</span>
            </div>
          </div>
          <Link to="/cart" className="flex items-center space-x-1 cursor-pointer group">
            <div className="flex gap-3 items-center border border-transparent p-2 group-hover:border-white">
              <FaShoppingCart className="text-2xl" />
              <span className="font-bold">Cart</span>
            </div>
          </Link>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isLanguageMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-700 p-4 rounded-md shadow-lg z-10">
          <div className="text-lg font-bold mb-2">Language Settings</div>
          <div className="text-sm mb-4">Select the language you prefer for browsing, shopping, and communications.</div>
          <div className="flex flex-col space-y-2">
            {[
              { code: 'EN', label: 'English' },
              { code: 'HI', label: 'हिन्दी' },
              { code: 'TA', label: 'தமிழ்' },
              { code: 'TE', label: 'తెలుగు' },
              { code: 'KN', label: 'ಕನ್ನಡ' },
              { code: 'ML', label: 'മലയാളം' },
              { code: 'BN', label: 'বাংলা' },
              { code: 'MR', label: 'मराठी' },
            ].map((lang) => (
              <label key={lang.code} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={tempLanguage === lang.code}
                  className="form-radio"
                  onChange={() => handleLanguageChange(lang.code)}
                />
                <span>{lang.label} - {lang.code}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {isAccountMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-700 p-4 rounded-md shadow-lg z-10">
          <div className="text-lg font-bold mb-2"> <Link to="/login" className="text-yellow-500 hover:underline">Sign in</Link></div>
          <div className="text-sm mb-4">New customer? <Link to="/signup" className="text-yellow-500 hover:underline">Start here.</Link></div>
          <div className="flex flex-col space-y-2">
            <Link to="/lists" className="hover:underline">Your Lists</Link>
            <Link to="/wishlist" className="hover:underline">Create a Wish List</Link>
            <Link to="/wish-any-website" className="hover:underline">Wish from Any Website</Link>
            <Link to="/baby-wishlist" className="hover:underline">Baby Wishlist</Link>
            <Link to="/style" className="hover:underline">Discover Your Style</Link>
            <Link to="/showroom" className="hover:underline">Explore Showroom</Link>
            <Link to="/account" className="hover:underline">Your Account</Link>
            <Link to="/orders" className="hover:underline">Your Orders</Link>
            <Link to="/wish-list" className="hover:underline">Your Wish List</Link>
            <Link to="/recommendations" className="hover:underline">Your Recommendations</Link>
            <Link to="/prime-membership" className="hover:underline">Your Prime Membership</Link>
            <Link to="/prime-video" className="hover:underline">Your Prime Video</Link>
            <Link to="/subscribe-save" className="hover:underline">Your Subscribe & Save Items</Link>
            <Link to="/memberships-subscriptions" className="hover:underline">Memberships & Subscriptions</Link>
            <Link to="/seller-account" className="hover:underline">Your Seller Account</Link>
            <Link to="/content-devices" className="hover:underline">Manage Your Content and Devices</Link>
            <Link to="/amazon-business-account" className="hover:underline">Your Free Amazon Business Account</Link>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-700 p-4 rounded-md shadow-lg z-50">
          {/* Mobile menu content here */}
        </div>
      )}
      <div className="bg-gray-900 text-white py-1">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
          {/* Hamburger Icon */}
          <button className="text-white">
            <FaBars />
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 flex-grow ml-2">
            <Link
              to="/fresh"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Fresh
            </Link>
            <Link
              to="/amazon-mini-tv"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Amazon Mini TV
            </Link>
            <Link
              to="/sell"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Sell
            </Link>
            <Link
              to="/best-sellers"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Best Sellers
            </Link>
            <Link
              to="/todays-deals"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Today's Deals
            </Link>
            <Link
              to="/mobiles"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Mobiles
            </Link>
            <Link
              to="/prime"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Prime
            </Link>
            <Link
              to="/customer-service"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Customer Service
            </Link>
            <Link
              to="/electronics"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Electronics
            </Link>
          </div>

          {/* Independence Image */}
          <img
            src={saleindia}
            alt="Independence Day"
            className="hidden lg:block w-48 h-6 transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md"
          />
        </div>
      </div>


    </div>
  );
}

export default Nav;
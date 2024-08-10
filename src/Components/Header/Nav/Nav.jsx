import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaMapMarkerAlt, FaBars, FaTimes, FaFlag } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import amazonLogo from '../../../assets/logo.png';
import indiaFlag from '../../../assets/indiaflag.png';
import saleindia from '../../../assets/saleind.png';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import style from './Nav.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryList } from '../../../Redux/Slices/categorySlice';
import { useSearch } from '../../Filters/useSearch';
import { SearchContext } from '../../myContexts/SearchContext';
import { useGlobalState } from '../../myContexts/GlobalStateContext';
import { formatEmail } from '../../Utils/truncateText';
import LocationModal from '../Modal/LocationModal ';
import { logout } from '../../../Redux/Slices/authSlice';

function Nav() {
  const { cartItems } = useGlobalState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useSelector((state) => state.location.location);

  const { user, status } = useSelector((state) => state.auth);
  console.log(user, status);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountMenuRef = useRef(null);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { data: categoryList, loading, error } = useSelector((state) => state.category);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/home');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
  const handleLinkClick = () => {
    setIsAccountMenuOpen(false); // Close the account menu
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const categoryPath = selectedCategory.toLowerCase().replace(/\s+/g, '-');
    // Navigate to the route based on the selected category
    if (selectedCategory !== 'all') {
      navigate(`/${categoryPath.toLowerCase()}`);
    } else {
      navigate('/'); 
    }
  };

  return (
    <div className=" text-white p-1 relative z-50" style={{ backgroundColor: "#131921" }}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="group border border-transparent p-2 group-hover:border-white">
            <Link to="/" className="flex-shrink-0">
              <img src={amazonLogo} alt="Amazon Logo" className="w-32" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center ml-4 group" onClick={() => setModalOpen(true)} >
            <div className="flex items-center border border-transparent p-2 group-hover:border-white">
              <FaMapMarkerAlt className="text-yellow-400" />
              <div className="ml-2">
                <div className="text-xs">{`Deliver to ${location}`}</div>
                <div className="text-sm font-bold">Update Location</div>
              </div>
            </div>
          </div>
        </div>
        <LocationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        <div className="flex flex-1 mx-4 items-center bg-gray-700 rounded-md overflow-hidden lg:ml-6">
          <select onChange={handleCategoryChange} className="p-2 flex-shrink-0 border-none bg-gray-700 text-white focus:outline-none h-full w-14">
            <option value="all">All</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <span className="text-xs">{status === 'succeeded' && user ? user.displayName || formatEmail(user.email) : 'Sign In'}</span>
              <span className="flex items-center space-x-1">
                <span className="font-bold">Account & Lists</span>
                <GoTriangleDown />
              </span>
            </div>
          </div>
          <Link to="/myorders" className="flex items-center space-x-1 cursor-pointer group">
            <div className="flex flex-col items-start cursor-pointer group">
              <div className="flex flex-col items-start border border-transparent p-2 group-hover:border-white">
                <span className="text-xs">Returns</span>
                <span className="font-bold">& Orders</span>
              </div>
            </div>
          </Link>
          <Link to="/cart" className="flex items-center space-x-2 cursor-pointer group relative">
            <div className="flex items-center border border-transparent p-2 group-hover:border-white relative">
              <FaShoppingCart className="text-2xl relative" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-semibold px-1 py-0.5 bg-[#f4a857] text-amazon_blue rounded-full flex justify-center items-center">
                  {cartItems.length}
                </span>
              )}
            </div>
            <p>Cart</p>
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
        <div ref={accountMenuRef} className="absolute top-16 right-4 bg-gray-700 p-4 rounded-md shadow-lg z-10">
          <div className="text-lg font-bold mb-2">
            <Link to="/login" className="text-yellow-500 hover:underline" onClick={handleLinkClick}>Sign in</Link>
          </div>
          <div className="text-sm mb-4">
            New customer? <Link to="/signup" className="text-yellow-500 hover:underline" onClick={handleLinkClick}>Start here.</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/lists" className="hover:underline" onClick={handleLinkClick}>Your Lists</Link>
            <Link to="/wishlist" className="hover:underline" onClick={handleLinkClick}>Create a Wish List</Link>
            <Link to="/wish-any-website" className="hover:underline" onClick={handleLinkClick}>Wish from Any Website</Link>
            <Link to="/baby-wishlist" className="hover:underline" onClick={handleLinkClick}>Baby Wishlist</Link>
            <Link to="/style" className="hover:underline" onClick={handleLinkClick}>Discover Your Style</Link>
            <Link to="/showroom" className="hover:underline" onClick={handleLinkClick}>Explore Showroom</Link>
            <Link to="/account" className="hover:underline" onClick={handleLinkClick}>Your Account</Link>
            <Link to="/myorders" className="hover:underline" onClick={handleLinkClick}>Your Orders</Link>
            <Link to="/wish-list" className="hover:underline" onClick={handleLinkClick}>Your Wish List</Link>
            <Link to="/recommendations" className="hover:underline" onClick={handleLinkClick}>Your Recommendations</Link>
            <Link to="/prime-membership" className="hover:underline" onClick={handleLinkClick}>Your Prime Membership</Link>
            <Link to="/prime-video" className="hover:underline" onClick={handleLinkClick}>Your Prime Video</Link>
            <Link to="/subscribe-save" className="hover:underline" onClick={handleLinkClick}>Your Subscribe & Save Items</Link>
            <Link to="/memberships-subscriptions" className="hover:underline" onClick={handleLinkClick}>Memberships & Subscriptions</Link>
            <Link to="/seller-account" className="hover:underline" onClick={handleLinkClick}>Your Seller Account</Link>
            <Link to="/content-devices" className="hover:underline" onClick={handleLinkClick}>Manage Your Content and Devices</Link>
            <Link to="/amazon-business-account" className="hover:underline" onClick={handleLinkClick}>Your Free Amazon Business Account</Link>
          </div>
        </div>
      )}


      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-0 right-0 w-50 h-full bg-black text-white z-20">
          <div className="p-4 bg-black ">
            <button onClick={toggleMobileMenu} className="text-white absolute top-2 right-2 focus:outline-none mb-4">
              <FaTimes />
            </button>
            <div className="space-y-4">
              <div className="flex flex-col justify-center items-center py-4">
                <FaUser className="w-8 h-8 mb-2" />
                {status === 'succeeded' ? (
                  <span className="font-bold text-center">{user.email}</span>
                ) : (
                  <Link to="/signup" className="font-bold text-center">
                    Register
                  </Link>
                )}
              </div>
              <Link
                to={status === 'succeeded' ? '#' : '/login'}
                onClick={(e) => {
                  if (status === 'succeeded') {
                    e.preventDefault();
                    handleLogout(e); // Call the logout handler
                  } else {
                    toggleMobileMenu(); // Handle the menu toggle when signing in
                  }
                }}
                className="block"
              >
                <span className="font-bold">
                  {status === 'succeeded' ? 'Sign Out' : 'Sign In'}
                </span>
              </Link>

              <Link to="/home" onClick={toggleMobileMenu} className="block">
                <span className="font-bold">Home</span>
              </Link>
              <Link to="/myorders" onClick={toggleMobileMenu} className="block">
                <span className="font-bold">Returns & Orders</span>
              </Link>
              <Link to="/cart" onClick={toggleMobileMenu} className="block">
                <FaShoppingCart className="inline mr-2" />
                <span>Cart ({cartItems.length})</span>
              </Link>

              <div className="flex items-center space-x-2">
                <img src={indiaFlag} alt="Indian Flag" className="w-5 h-5" />
                <button onClick={toggleLanguageMenu}>{selectedLanguage}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id={style.Nav2} style={{ width: "100%", backgroundColor: "#242F3E" }} className="left-0 w-full text-white py-1 Nav2 ">
        <div className="flex items-center justify-between max-w-full px-2">
          {/* Hamburger Icon */}
          <button onClick={toggleSidebar} className="text-white">
            <FaBars />
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 flex-grow ml-2">
            <Link
              to="/home"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Home
            </Link>
            <Link
              to="/amazon-mini-tv"
              className="relative text-sm transition-all duration-300 border-transparent hover:border-yellow-500 hover:bg-gray-800 border-2 border-solid rounded-md whitespace-nowrap px-2 py-1"
            >
              Amazon Mini TV
            </Link>
            <Link
              to="/mobiles"
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
              to="/appliances"
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
      <LeftSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

    </div>
  );
}

export default Nav;
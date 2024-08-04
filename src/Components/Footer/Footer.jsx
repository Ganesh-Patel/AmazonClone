import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import amazonLogo from '../../assets/logo.png';
import indiaFlag from '../../assets/indiaflag.png';

function Footer() {
  return (
    <div className="bg-gray-900" >
      {/* Top section with light gray background */}
      <div className=" text-center py-2 " style={{ backgroundColor: "#37475A" }}>
        <button
          className="w-full h-8 text-white font-bold"
          style={{ backgroundColor: "#37475A" }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </button>
      </div>
      <div className="py-10 text-white" style={{ backgroundColor: "#242F3E" }}>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 ">
            <div>
              <h3 className="text-lg font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2" style={{ color: "#999999" }}>
                <li><Link to="#" className="hover:underline">About Us</Link></li>
                <li><Link to="#" className="hover:underline">Careers</Link></li>
                <li><Link to="#" className="hover:underline">Press Releases</Link></li>
                <li><Link to="#" className="hover:underline">Amazon Cares</Link></li>
                <li><Link to="#" className="hover:underline">Gift a Smile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
              <ul className="space-y-2" style={{ color: "#999999" }}>
                <li><Link to="#" className="hover:underline">Facebook</Link></li>
                <li><Link to="#" className="hover:underline">Twitter</Link></li>
                <li><Link to="#" className="hover:underline">Instagram</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2" style={{ color: "#999999" }}>
                <li><Link to="#" className="hover:underline">Sell on Amazon</Link></li>
                <li><Link to="#" className="hover:underline">Sell under Amazon Accelerator</Link></li>
                <li><Link to="#" className="hover:underline">Become an Affiliate</Link></li>
                <li><Link to="#" className="hover:underline">Fulfilment by Amazon</Link></li>
                <li><Link to="#" className="hover:underline">Advertise Your Products</Link></li>
                <li><Link to="#" className="hover:underline">Amazon Pay on Merchants</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2" style={{ color: "#999999" }}>
                <li><Link to="#" className="hover:underline">COVID-19 and Amazon</Link></li>
                <li><Link to="#" className="hover:underline">Your Account</Link></li>
                <li><Link to="#" className="hover:underline">Returns Centre</Link></li>
                <li><Link to="#" className="hover:underline">100% Purchase Protection</Link></li>
                <li><Link to="#" className="hover:underline">Amazon App Download</Link></li>
                <li><Link to="#" className="hover:underline">Amazon Assistant Download</Link></li>
                <li><Link to="#" className="hover:underline">Help</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

 
      <div className="py-8 border-t-2 border-gray-600" style={{ backgroundColor: "#242F3E" }}>
        <div className="flex justify-center items-center gap-6 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center cursor-pointer"  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={amazonLogo} alt="Amazon Logo" className="h-8" />
          </Link>
          <div className="flex items-center justify-center ml-6 gap-3">
            <div className="relative flex items-center border border-gray-400 p-2 rounded-md cursor-pointer">
              <FaGlobe className=" mr-2 text-white" />
              <select className="bg-transparent text-whiteoutline-none text-white">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="flex items-center border border-gray-400 p-2 rounded-md cursor-pointer">
              <img src={indiaFlag} alt="India Flag" className="h-6 w-8 object-cover" />
              <span className="ml-2 text-white">India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with darker background */}
      <div className=" text-gray-400 py-10" style={{ backgroundColor: "#131A22" }} >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0 text-sm">
          <div>
            <h4 className="text-white font-bold mb-2">AbeBooks</h4>
            <p>Books, art & collectibles</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Amazon Web Services</h4>
            <p>Scalable Cloud Computing Services</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Audible</h4>
            <p>Download Audio Books</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">IMDb</h4>
            <p>Movies, TV & Celebrities</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Shopbop</h4>
            <p>Designer Fashion Brands</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Amazon Business</h4>
            <p>Everything For Your Business</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Prime Now</h4>
            <p>2-Hour Delivery on Everyday Items</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Amazon Prime Music</h4>
            <p>100 million songs, ad-free</p>
            <p>Over 15 million podcast episodes</p>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="bg-gray-900 py-4 text-center text-sm text-gray-500">
        <p>Conditions of Use & Sale | Privacy Notice | Interest-Based Ads | © 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default Footer;

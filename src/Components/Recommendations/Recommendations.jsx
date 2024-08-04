import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PersonalRecommendations = () => {
    const { user, status } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-40 border border-gray-300 p-4 bg-white">
      {/* Container for the content */}
      <div className="flex flex-col justify-center items-center h-full">
        {status === 'succeeded' ? (
          <div className="text-center">
            <p className="text-xl font-bold mb-4">Personalized Recommendations</p>
            <p className="text-gray-700">Based on your activity on Amazon.</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm   mb-2">See Personalized Recommendations</p>
            <Link
              to="/login"
              className="bg-amazon-orange text-white px-4 py-2 rounded hover:bg-amazon-orange-dark text-center"
              style={{ backgroundColor: "#F5A623", borderColor: "#F5A623", display: "inline-block", width: "250px" }}
            >
              Sign In
            </Link>
            <p className="text-gray-700 mt-2">New customer? <Link to="/signup" className="text-amazon-blue hover:underline">Start here.</Link></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalRecommendations;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../Redux/Slices/locationSlice';

const LocationModal = ({ isOpen, onClose }) => {
  const [inputLocation, setInputLocation] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (inputLocation.trim() !== '') {
      dispatch(setLocation(inputLocation));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all ease-in-out duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Update Your Location
        </h2>
        <input
          type="text"
          placeholder="Enter your location"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 text-gray-700"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all ease-in-out duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

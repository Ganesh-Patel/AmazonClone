import React, { createContext, useState, useEffect } from 'react';
import searchData from '../AllData/SearchData';
import dealsProductData from '../AllData/DealsProduct';

const originalMobilesData = searchData?.data?.products || [];
const originalAppliancesData = dealsProductData?.data?.products || [];

console.log(originalMobilesData, originalAppliancesData);

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState({
    mobiles: originalMobilesData,
    appliances: originalAppliancesData,
    // Add other categories as needed
  });

  useEffect(() => {
    // Filtering data based on the search term
    console.log('object', searchTerm);
    const filteredMobiles = originalMobilesData.filter(item =>
      item.product_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredAppliances = originalAppliancesData.filter(item =>
      item.product_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData({ mobiles: filteredMobiles, appliances: filteredAppliances });
  }, [searchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredData }}>
      {children}
    </SearchContext.Provider>
  );
};

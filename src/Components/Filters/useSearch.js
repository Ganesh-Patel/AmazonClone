import { useState, useEffect } from 'react';
import data from '../AllData/SearchData';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data.data.products);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data.data.products);
    } else {
      console.log('you Search  useffect called here');
      setFilteredData(
        data.data.products.filter((product) =>
          product.product_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};

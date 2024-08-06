import React, { useState } from 'react';
import { filterOptions } from '../../AllData/filterOptions'; // Adjust the path as necessary
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: '',
    brand: [],
    customerReview: '',
  });
  const [showAll, setShowAll] = useState({
    brand: false,
    category: false,
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };

      if (filterType === 'brand' || filterType === 'category') {
        if (!Array.isArray(updatedFilters[filterType])) {
          updatedFilters[filterType] = [];
        }

        if (updatedFilters[filterType].includes(value)) {
          updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
        } else {
          updatedFilters[filterType].push(value);
        }
      } else {
        updatedFilters[filterType] = value;
      }

      // Notify the parent component about filter changes
      onFilterChange(updatedFilters);

      return updatedFilters;
    });
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    handleFilterChange('priceRange', value);
  };

  const renderOptions = (options, type, filterType) => {
    if (!Array.isArray(options)) {
      return null;
    }

    if (type === 'checkbox') {
      return options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filterType, option.value)}
            checked={selectedFilters[filterType]?.includes(option.value) || false}
          />
          {option.label}
        </label>
      ));
    }

    if (type === 'radio') {
      return options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={filterType}
            onChange={() => handleFilterChange(filterType, option.value)}
            checked={selectedFilters[filterType] === option.value}
          />
          {option.label}
        </label>
      ));
    }

    return null;
  };

  return (
    <div className={styles.filterSidebar}>
      {filterOptions.map((filter, index) => {
        const isBrandOrCategory = filter.label === 'Brand' || filter.label === 'Category';
        const showMore = showAll[filter.label.toLowerCase()];

        return (
          <div key={index} className={styles.filterSection}>
            <h3>{filter.label}</h3>
            {filter.label === 'Price Range' ? (
              <select
                value={selectedFilters.priceRange}
                onChange={handlePriceRangeChange}
              >
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : isBrandOrCategory ? (
              renderOptions(
                filter.options.slice(0, showMore ? filter.options.length : 5),
                filter.type,
                filter.label.toLowerCase()
              )
            ) : (
              renderOptions(filter.options, filter.type, filter.label.toLowerCase())
            )}

            {isBrandOrCategory && filter.options.length > 5 && (
              <button
                className={styles.seeMoreButton}
                onClick={() => setShowAll((prevState) => ({
                  ...prevState,
                  [filter.label.toLowerCase()]: !showMore
                }))}
              >
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;

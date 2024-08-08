import React, { useState } from 'react';
import { filterOptions } from '../../AllData/filterOptions'; // Adjust the path as necessary
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [showAll, setShowAll] = useState({
    brand: false,
    category: false,
  });

  const handleFilterChange = (filterType, value) => {
    console.log('object', 12, filterType, value);
    const updatedFilters = { ...filters };

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
      const filterName = filterType.replace(/[\s_.,]+/g, '').toLowerCase();
      updatedFilters[filterName] = value;
    }
    console.log('object', 27, updatedFilters);

    onFilterChange(updatedFilters);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    console.log('object', value);
    handleFilterChange('priceRange', value);
  };
  const clearAllFilters = () => {
    onFilterChange({category: [],
      priceRange: '',
      price: '',
      brand: [],
      avgcustomerreview: '',
      rating: '',}); // Reset filters to an empty object
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
            checked={filters[filterType]?.includes(option.value) || false}
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
            checked={filters[filterType] === option.value}
          />
          {option.label}
        </label>
      ));
    }

    return null;
  };

  return (
    <div className={styles.filterSidebar}>
       <button className={styles.clearAllButton} onClick={clearAllFilters}>
        Clear All Filters
      </button>
      {filterOptions.map((filter, index) => {
        const isBrandOrCategory = filter.label === 'Brand' || filter.label === 'Category';
        const showMore = showAll[filter.label.toLowerCase()];

        return (
          <div key={index} className={styles.filterSection}>
            <h3>{filter.label}</h3>
            {filter.label === 'Price Range' ? (
              <select
                value={filters.priceRange}
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

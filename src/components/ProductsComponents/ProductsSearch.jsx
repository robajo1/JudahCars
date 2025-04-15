import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './productsSearch.css';

function ProductsSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const [condition, setCondition] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [mileage, setMileage] = useState('');
  const [year, setYear] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [engineType, setEngineType] = useState('');
  const [fuel, setFuel] = useState(''); // Added fuel state
  const [transmission, setTransmission] = useState(''); // Added transmission state
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);

  const handleFilterSubmit = () => {
    const params = new URLSearchParams(location.search);

    if (condition) params.set('condition', condition);
    else params.delete('condition');

    if (make) params.set('make', make);
    else params.delete('make');

    if (model) params.set('model', model);
    else params.delete('model');

    if (priceRange) params.set('price', priceRange);
    else params.delete('price');

    if (mileage) params.set('mileage', mileage);
    else params.delete('mileage');

    if (year) params.set('year', year);
    else params.delete('year');

    if (locationFilter) params.set('location', locationFilter);
    else params.delete('location');

    if (engineType) params.set('engine', engineType);
    else params.delete('engine');

    if (fuel) params.set('fuel', fuel); // Added fuel to URL params
    else params.delete('fuel');

    if (transmission) params.set('transmission', transmission); // Added transmission to URL params
    else params.delete('transmission');

    navigate(`/products?${params.toString()}`);
  };

  const toggleMoreFilters = () => {
    setMoreFiltersVisible(!moreFiltersVisible);
  };

  return (
    <div className="products-search-container">
      <div className="filter-bar">
        <select onChange={(e) => setCondition(e.target.value)} className="filter-select">
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        <select onChange={(e) => setMake(e.target.value)} className="filter-select">
          <option value="">Any Makes</option>
          <option value="Toyota">Toyota</option>
          <option value="Nissan">Nissan</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Kia">Kia</option>
        </select>

        <select onChange={(e) => setModel(e.target.value)} className="filter-select">
          <option value="">Any Models</option>
          <option value="Corolla">Corolla</option>
          <option value="Sunny">Sunny</option>
        </select>

        <select onChange={(e) => setPriceRange(e.target.value)} className="filter-select">
          <option value="">Prices: All Prices</option>
          <option value="0-500000">0 - 500,000 ETB</option>
          <option value="500001-1000000">500,001 - 1,000,000 ETB</option>
          <option value="1000001-2000000">1,000,001 - 2,000,000 ETB</option>
          <option value="2000001-5000000">2,000,001 - 5,000,000 ETB</option>
        </select>

        <button className="more-filters-button" onClick={toggleMoreFilters}>
          [More Filters]
        </button>

        <button onClick={handleFilterSubmit} className="find-listing-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Find Listing
        </button>
      </div>

      {moreFiltersVisible && (
        <div className="more-filters">
          <select onChange={(e) => setMileage(e.target.value)} className="filter-select">
            <option value="">Mileage: Any</option>
            <option value="0-50000">0 - 50,000 KM</option>
            <option value="50001-100000">50,001 - 100,000 KM</option>
            <option value="100001-150000">100,001 - 150,000 KM</option>
            <option value="150001-above">150,001+ KM</option>
          </select>

          <select onChange={(e) => setYear(e.target.value)} className="filter-select">
            <option value="">Year: Any</option>
            <option value="2020-above">2020 and Above</option>
            <option value="2015-2019">2015 - 2019</option>
            <option value="2010-2014">2010 - 2014</option>
            <option value="below-2010">Below 2010</option>
          </select>

          <select onChange={(e) => setLocationFilter(e.target.value)} className="filter-select">
            <option value="">Location: Any</option>
            <option value="Addis Ababa">Addis Ababa</option>
          </select>

          <select onChange={(e) => setEngineType(e.target.value)} className="filter-select">
            <option value="">Engine: Any</option>
            <option value="I4">I4</option>
            <option value="V6">V6</option>
            <option value="V8">V8</option>
          </select>

          <select onChange={(e) => setFuel(e.target.value)} className="filter-select">
            <option value="">Fuel: Any</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select onChange={(e) => setTransmission(e.target.value)} className="filter-select">
            <option value="">Transmission: Any</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default ProductsSearch;